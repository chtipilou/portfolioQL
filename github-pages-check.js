#!/usr/bin/env node

/**
 * Script de vérification pour GitHub Pages
 * Vérifie la configuration et prépare le projet pour le déploiement
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration GitHub Pages...\n');

// Vérifications
const checks = [
  {
    name: 'next.config.js configuré pour export statique',
    check: () => {
      try {
        const config = fs.readFileSync('next.config.js', 'utf8');
        return config.includes("output: 'export'") && config.includes('basePath: \'/portfolioQL\'');
      } catch (e) {
        return false;
      }
    }
  },
  {
    name: 'Workflow GitHub Actions présent',
    check: () => {
      return fs.existsSync('.github/workflows/deploy.yml');
    }
  },
  {
    name: 'Package.json contient les scripts nécessaires',
    check: () => {
      try {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        return pkg.scripts && pkg.scripts.build && pkg.scripts.dev;
      } catch (e) {
        return false;
      }
    }
  },
  {
    name: 'Fichier de redirection créé',
    check: () => {
      return fs.existsSync('redirect-index.html');
    }
  },
  {
    name: 'Assets avec chemins corrects',
    check: () => {
      try {
        const pageContent = fs.readFileSync('app/page.tsx', 'utf8');
        return pageContent.includes('/portfolioQL/assets/') || pageContent.includes('/portfolioQL/');
      } catch (e) {
        return false;
      }
    }
  }
];

let allPassed = true;

checks.forEach((check, index) => {
  const passed = check.check();
  console.log(`${passed ? '✅' : '❌'} ${check.name}`);
  if (!passed) allPassed = false;
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 Toutes les vérifications sont passées !');
  console.log('📁 Le projet est prêt pour GitHub Pages');
  console.log('\n📋 Prochaines étapes :');
  console.log('1. Commit et push vers GitHub');
  console.log('2. Activer GitHub Pages dans Settings > Pages');
  console.log('3. Configurer la redirection avec redirect-index.html');
  console.log('4. Accéder au site sur https://chtipilou.github.io/portfolioQL/');
} else {
  console.log('⚠️  Certaines vérifications ont échoué');
  console.log('📝 Vérifiez les éléments marqués avec ❌');
}

console.log('\n🔗 Liens utiles :');
console.log('- Repository : https://github.com/chtipilou/portfolioQL');
console.log('- GitHub Pages : https://chtipilou.github.io/portfolioQL/');
console.log('- Actions : https://github.com/chtipilou/portfolioQL/actions');

console.log('\n' + '='.repeat(50));
