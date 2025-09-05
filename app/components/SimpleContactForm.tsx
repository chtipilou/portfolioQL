'use client';

import React, { useState } from 'react';

const MAX_NAME_LENGTH = 32;
const MAX_EMAIL_LENGTH = 64;
const MAX_MESSAGE_LENGTH = 1000;

const SimpleContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    const { name, email, message } = formData;
    
    // Si aucun champ n'est rempli
    if (!name || !email || !message) {
      setFormStatus('error');
      setErrorMessage("Tous les champs sont requis");
      return;
    }
    
    try {
      // Pour GitHub Pages, nous utilisons un service externe comme Formspree
      // ou directement un mailto avec les données pré-remplies
      const isGitHubPages = window.location.hostname.includes('github.io');
      
      if (isGitHubPages) {
        // Pour GitHub Pages : générer un email avec les données
        const subject = `Message de contact portfolio - ${name}`;
        const body = `Nom: ${name}%0A` +
                    `Email: ${email}%0A%0A` +
                    `Message: ${message}%0A%0A` +
                    `----%0A` +
                    `Envoyé depuis le portfolio le ${new Date().toLocaleDateString()}`;
        
        const mailtoUrl = `mailto:quentinleroy62131@outlook.fr?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.open(mailtoUrl);
        
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
        
        return;
      }
      
      // Appel direct à l'API locale pour les déploiements dynamiques
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          timestamp: new Date().toISOString() // horodatage
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Rate limiting et blacklist 403
        if (response.status === 429) {
          throw new Error("Limite d'envoi atteinte. Veuillez réessayer plus tard.");
        } else if (response.status === 403) {
          throw new Error("Accès refusé. Vous avez été restreint.");
        } else {
          throw new Error(data.message || "Erreur lors de l'envoi");
        }
      }
      
      // Réinitialiser le formulaire après succès
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Erreur:', error);
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : "L'envoi a échoué. Contactez-moi directement à quentinleroy62131@outlook.fr");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-8 rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80">
      {formStatus === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 p-4 rounded-lg">
          <p>
            {window.location.hostname.includes('github.io') 
              ? "Votre client email va s'ouvrir avec le message pré-rempli. Envoyez-le pour me contacter !" 
              : "Message envoyé avec succès! Je le recevrai directement dans ma boîte mail."
            }
          </p>
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-4 rounded-lg">
          <p>{errorMessage}</p>
          <p className="text-sm mt-2">Alternative: contactez-moi directement à <a href="mailto:quentinleroy62131@outlook.fr" className="underline">quentinleroy62131@outlook.fr (GitHub bloque les appels d'API. Le formulaire fonctionnera dès que je le mettrai sur un vrai domaine. Merci de votre compréhension.)</a></p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nom <span className="text-xs text-gray-500">({formData.name.length}/{MAX_NAME_LENGTH})</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            disabled={formStatus === 'loading'}
            maxLength={MAX_NAME_LENGTH}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email <span className="text-xs text-gray-500">({formData.email.length}/{MAX_EMAIL_LENGTH})</span>
          </label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            disabled={formStatus === 'loading'}
            maxLength={MAX_EMAIL_LENGTH}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Message <span className="text-xs text-gray-500">({formData.message.length}/{MAX_MESSAGE_LENGTH})</span>
        </label>
        <textarea 
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          disabled={formStatus === 'loading'}
          maxLength={MAX_MESSAGE_LENGTH}
          required
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={formStatus === 'loading'}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl
                 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20
                 font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {formStatus === 'loading' ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Envoi en cours...
          </span>
        ) : "Envoyer"}
      </button>
      
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
        Je vous répondrai dans les plus brefs délais. Merci!
      </p>
    </form>
  );
};

export default SimpleContactForm;
