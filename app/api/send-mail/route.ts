import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { headers } from 'next/headers';
import fs from 'fs';
import path from 'path';

// Limites de requêtes
const IP_LIMITS = {
  MAX_PER_HOUR: 3,
  MAX_PER_DAY: 10
};

const ipRequests: Map<string, {
  hourlyCount: number,
  dailyCount: number,
  lastRequest: number,
  lastHourReset: number,
  lastDayReset: number
}> = new Map();

// Charge la blacklist existante
const getBlacklist = (): string[] => {
  try {
    const blacklistPath = path.join(process.cwd(), 'config', 'blacklist.json');
    if (fs.existsSync(blacklistPath)) {
      const data = fs.readFileSync(blacklistPath, 'utf8');
      const blacklist = JSON.parse(data);
      return Array.isArray(blacklist.blockedIps) ? blacklist.blockedIps : [];
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la blacklist:', error);
  }
  return [];
};

// Validation des données
const validateRequest = (name: string, email: string, message: string) => {
  if (!name || !email || !message) {
    return "Tous les champs sont requis";
  }
  
  if (name.length > 100 || email.length > 100) {
    return "Nom ou email trop long";
  }
  
  if (message.length > 1000) {
    return "Message trop long (1000 caractères maximum)";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Format d'email invalide";
  }
  
  // Vérifie les caractères evite les xss et scripts etc...
  const suspiciousRegex = /<script|javascript:|onclick|onload|eval\(/i;
  if (suspiciousRegex.test(name + email + message)) {
    return "Erreur, veuillez ne pas utiliser de balises HTML ou de scripts";
  }
  
  return null;
};

// Agis comme un anti-csrf reçu en mail et donc n'execute pas les scripts html envoyés depuis le formulaire contact
const sanitizeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const cfConnectingIp = headersList.get('cf-connecting-ip');
    
    let ip = forwardedFor?.split(',')[0].trim() || 
             realIp || 
             cfConnectingIp || 
             'unknown';
    
    console.log(`Formulaire de contact soumis depuis l'IP: ${ip}`);
    
    // Vérifie si l'IP est blacklistée
    const blacklist = getBlacklist();
    if (blacklist.includes(ip)) {
      console.warn(`Tentative de contact d'une IP blacklistée: ${ip}`);
      return NextResponse.json(
        { message: "Votre adresse IP a été blacklistée en raison d'abus antérieurs." },
        { status: 403 }
      );
    }
    
    const now = Date.now();
    const hourMs = 60 * 60 * 1000;
    const dayMs = 24 * hourMs;
    
    const ipData = ipRequests.get(ip) || {
      hourlyCount: 0,
      dailyCount: 0,
      lastRequest: 0,
      lastHourReset: now,
      lastDayReset: now
    };
    
    // Reset compteur
    if (now - ipData.lastHourReset > hourMs) {
      ipData.hourlyCount = 0;
      ipData.lastHourReset = now;
    }
    
    if (now - ipData.lastDayReset > dayMs) {
      ipData.dailyCount = 0;
      ipData.lastDayReset = now;
    }
    
    // Vérifier les limites
    if (ipData.hourlyCount >= IP_LIMITS.MAX_PER_HOUR) {
      return NextResponse.json(
        { message: "Limite horaire d'envoi de messages atteinte. Veuillez réessayer plus tard." },
        { status: 429 }
      );
    }
    
    if (ipData.dailyCount >= IP_LIMITS.MAX_PER_DAY) {
      return NextResponse.json(
        { message: "Limite journalière d'envoi de messages atteinte. Veuillez réessayer demain." },
        { status: 429 }
      );
    }
    
    // Analyser les données du formulaire
    const data = await req.json();
    const { name, email, message } = data;
    
    // Valider les entrées
    const validationError = validateRequest(name, email, message);
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }
    
    // Sanitize les entrées
    const safeName = sanitizeHtml(name);
    const safeEmail = sanitizeHtml(email);
    const safeMessage = sanitizeHtml(message);
    
    // Configuration Gmail avec les identifiants
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Vérifier les identifiants
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return NextResponse.json(
        { message: "Configuration d'envoi d'email manquante. Vérifiez votre .env.local" }, 
        { status: 500 }
      );
    }
    
    // Formater l'heure actuelle
    const now_formatted = new Date().toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Prépare l'email à envoyer
    const mailOptions = {
      from: `"${safeName} via Portfolio" <${process.env.EMAIL_USER}>`, // Du Gmail
      to: process.env.EMAIL_RECIPIENT || "quentinleroy62131@outlook.fr", // Vers mon Outlook ici (a changer)
      replyTo: safeEmail,
      subject: `Message de contact portfolio - ${safeName}`,
      text: `Nom: ${safeName}
Email: ${safeEmail}
Message: ${safeMessage}

Date: ${now_formatted}
IP: ${ip}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #3b82f6; margin-top: 0;">Nouveau message du portfolio</h2>
          <p><strong>Nom:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f7fa; padding: 15px; border-radius: 5px; margin-top: 10px; margin-bottom: 15px;">
            ${safeMessage.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
          <p style="color: #666; font-size: 12px; margin-bottom: 5px;">Date: ${now_formatted}</p>
          <p style="color: #888; font-size: 11px; margin-top: 0;">
            IP: <code>${ip}</code> 
            <a href="mailto:${process.env.EMAIL_USER}?subject=BLACKLIST IP ${ip}" style="margin-left: 10px; color: #e53e3e; font-size: 10px;">Blacklister cette IP</a>
          </p>
        </div>
      `
    };

    // Envoie l'email
    const info = await transporter.sendMail(mailOptions);
    
    // Met à jour les compteurs
    ipData.hourlyCount++;
    ipData.dailyCount++;
    ipData.lastRequest = now;
    ipRequests.set(ip, ipData);
    
    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès",
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    return NextResponse.json(
      { message: "Échec de l'envoi d'email", error: String(error) },
      { status: 500 }
    );
  }
}
