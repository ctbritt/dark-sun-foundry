#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Update version in module.json
 * @param {string} newVersion - The new version to set
 */
function updateVersion(newVersion) {
  const modulePath = path.join(__dirname, '..', 'module.json');
  const moduleJson = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
  
  moduleJson.version = newVersion;
  
  fs.writeFileSync(modulePath, JSON.stringify(moduleJson, null, 2));
  console.log(`✅ Updated version to ${newVersion}`);
}

/**
 * Create a release zip file
 */
function createReleaseZip() {
  const { execSync } = require('child_process');
  const moduleJson = JSON.parse(fs.readFileSync('module.json', 'utf8'));
  
  const zipName = `${moduleJson.id}-v${moduleJson.version}.zip`;
  
  // Create zip excluding git and github files
  execSync(`zip -r ${zipName} . -x "*.git*" "*.github*" "node_modules/*" "*.log" "*.tmp" "scripts/*"`, { stdio: 'inherit' });
  
  console.log(`✅ Created release zip: ${zipName}`);
  return zipName;
}

/**
 * Update module.json with release URLs
 * @param {string} version - The version being released
 */
function updateManifestUrls(version) {
  const modulePath = path.join(__dirname, '..', 'module.json');
  const moduleJson = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
  
  // Add manifest and download URLs for Foundry VTT
  moduleJson.manifest = `https://github.com/ctbritt/dark-sun-foundry/releases/download/v${version}/module.json`;
  moduleJson.download = `https://github.com/ctbritt/dark-sun-foundry/releases/download/v${version}/module.zip`;
  
  fs.writeFileSync(modulePath, JSON.stringify(moduleJson, null, 2));
  console.log('✅ Updated manifest URLs');
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'version':
    const newVersion = args[1];
    if (!newVersion) {
      console.error('❌ Please provide a version number');
      process.exit(1);
    }
    updateVersion(newVersion);
    break;
    
  case 'zip':
    createReleaseZip();
    break;
    
  case 'manifest':
    const version = args[1];
    if (!version) {
      console.error('❌ Please provide a version number');
      process.exit(1);
    }
    updateManifestUrls(version);
    break;
    
  case 'release':
    const releaseVersion = args[1];
    if (!releaseVersion) {
      console.error('❌ Please provide a version number');
      process.exit(1);
    }
    updateVersion(releaseVersion);
    updateManifestUrls(releaseVersion);
    createReleaseZip();
    console.log(`\n🎉 Ready for release v${releaseVersion}!`);
    console.log('Next steps:');
    console.log('1. Commit the changes');
    console.log('2. Create a GitHub release with tag v' + releaseVersion);
    console.log('3. Upload the generated zip file to the release');
    break;
    
  default:
    console.log('Usage:');
    console.log('  node scripts/release.js version <version>  - Update version in module.json');
    console.log('  node scripts/release.js zip                - Create release zip');
    console.log('  node scripts/release.js manifest <version> - Update manifest URLs');
    console.log('  node scripts/release.js release <version>  - Prepare for release');
    break;
} 