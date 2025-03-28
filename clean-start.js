const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Script de préparation automatique');
console.log('===============================================');

// Liste des dépendances requises
const requiredDependencies = {
  dependencies: {
    'next': '14.1.0',
    'react': '18.2.0',
    'react-dom': '18.2.0',
    'nodemailer': 'latest'
  },
  devDependencies: {
    '@types/node': 'latest',
    '@types/react': 'latest',
    '@types/react-dom': 'latest',
    '@types/nodemailer': 'latest',
    'autoprefixer': 'latest',
    'postcss': 'latest',
    'tailwindcss': 'latest',
    'typescript': 'latest'
  }
};

// Dossiers temporaires à nettoyer
const tempFoldersToClean = [
  '.next',
  'out',
  'node_modules/.cache'
];

// Fichiers à supprimer (liste vide par défaut pour éviter l'erreur)
const filesToRemove = [];

// 1. Nettoyage des dossiers temporaires
console.log('\n🧹 Nettoyage des dossiers temporaires...');
tempFoldersToClean.forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (fs.existsSync(folderPath)) {
    try {
      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${folderPath}"`);
      } else {
        execSync(`rm -rf "${folderPath}"`);
      }
      console.log(`✅ Dossier nettoyé: ${folder}`);
    } catch (error) {
      console.error(`❌ Erreur lors du nettoyage de ${folder}:`, error.message);
    }
  }
});

// 2. Création du dossier config s'il n'existe pas
const configDir = path.join(__dirname, 'config');
if (!fs.existsSync(configDir)) {
  console.log('\n📁 Création du dossier config...');
  fs.mkdirSync(configDir, { recursive: true });
  console.log('✅ Dossier config créé');
}

// 3. Création du fichier blacklist.json s'il n'existe pas
const blacklistPath = path.join(configDir, 'blacklist.json');
if (!fs.existsSync(blacklistPath)) {
  console.log('\n📄 Création du fichier blacklist.json...');
  const defaultBlacklist = {
    "blockedIps": [],
    "lastUpdated": new Date().toISOString(),
    "comments": {}
  };
  fs.writeFileSync(blacklistPath, JSON.stringify(defaultBlacklist, null, 2));
  console.log('✅ Fichier blacklist.json créé');
}

// 4. Vérification des fichiers d'environnement
console.log('\n🔐 Vérification des fichiers d\'environnement...');
const envFiles = [
  {file: '.env.local', required: true, template: '.env.example'},
  {file: '.env.development', required: false},
  {file: '.env.production', required: false}
];

envFiles.forEach(({file, required, template}) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} existe`);
  } else if (required) {
    console.log(`⚠️ ${file} manquant (requis)`);
    
    // Copier depuis le template si disponible
    if (template) {
      const templatePath = path.join(__dirname, template);
      if (fs.existsSync(templatePath)) {
        console.log(`   Création depuis ${template}...`);
        fs.copyFileSync(templatePath, filePath);
        console.log(`✅ ${file} créé depuis ${template}`);
      }
    }
  } else {
    console.log(`ℹ️ ${file} manquant (optionnel)`);
  }
});

// 5. Vérification du package.json
console.log('\n📦 Vérification du package.json...');
const packageJsonPath = path.join(__dirname, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.log('⚠️ package.json manquant, création...');
  const defaultPackageJson = {
    name: 'portfolio.quentinleroy',
    version: '0.1.0',
    private: true,
    homepage: "https://chtipilou.github.io/portfolioQL",
    scripts: {
      "dev": "next dev",
      "build": "cross-env NODE_ENV=production next build",
      "start": "npx serve@latest out",
      "lint": "next lint"
    },
    dependencies: requiredDependencies.dependencies,
    devDependencies: requiredDependencies.devDependencies
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(defaultPackageJson, null, 2));
  console.log('✅ package.json créé');
} else {
  console.log('✅ package.json existant');
  
  // Mise à jour des dépendances si nécessaire
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let updated = false;
    
    if (!packageJson.dependencies) packageJson.dependencies = {};
    if (!packageJson.devDependencies) packageJson.devDependencies = {};
    
    // Vérifier les dépendances manquantes
    Object.entries(requiredDependencies.dependencies).forEach(([pkg, version]) => {
      if (!packageJson.dependencies[pkg]) {
        console.log(`➕ Ajout de la dépendance: ${pkg}`);
        packageJson.dependencies[pkg] = version;
        updated = true;
      }
    });
    
    Object.entries(requiredDependencies.devDependencies).forEach(([pkg, version]) => {
      if (!packageJson.devDependencies[pkg]) {
        console.log(`➕ Ajout de la dépendance de dev: ${pkg}`);
        packageJson.devDependencies[pkg] = version;
        updated = true;
      }
    });
    
    // Enregistrer les modifications si nécessaire
    if (updated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ package.json mis à jour avec les dépendances manquantes');
    } else {
      console.log('✅ Toutes les dépendances requises sont présentes');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du package.json:', error.message);
  }
}

// 6. Installation des dépendances NPM
console.log('\n📦 Installation des dépendances NPM...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dépendances installées avec succès');
} catch (error) {
  console.error('❌ Erreur lors de l\'installation des dépendances:', error);
  process.exit(1);
}

console.log('\n🎯 Projet préparé avec succès!');
console.log('===================================');
console.log('✓ Fichiers temporaires nettoyés');
console.log('✓ Dépendances installées');
console.log('===================================');

// 7. Démarrage du serveur
console.log('\n🚀 Démarrage du serveur de développement...');
try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Erreur lors du démarrage du serveur:', error);
}
