const fs = require("fs");
const fsExtra = require("fs-extra");
const {execSync} = require("child_process");
const config = JSON.parse(fs.readFileSync('package.json').toString());
const currentVersion = config.version;
const libs = [
  'core',
  'dynamic-component',
  'icon-button',
  'datatable',
];

for (const [index, lib] of libs.entries()) {
  execSync(`ng build ${lib} --configuration production`, {stdio: 'ignore'});
  console.log(`[${index + 1} of ${libs.length}] ${lib} built with successfully.`);
}

fs.writeFileSync('dist/package.json', JSON.stringify({
  "name": "@cat/ui",
  "version": currentVersion,
  "description": config.description,
  "repository": {
    "type": "git",
    "url": "git+https://github.com/igordrangel/koala-angular-template.git"
  },
  "keywords": config.keywords,
  "author": "Igor D. Rangel",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/igordrangel/cat-ui/issues"
  },
  "homepage": "https://github.com/igordrangel/cat-ui#readme",
  "types": "./koalarx-ui.d.ts",
  "peerDependencies": {
    "@angular/common": ">=14.1.3",
    "@angular/core": ">=14.1.3",
    "@angular/forms": ">=14.1.3",
    "@angular/material": ">=14.1.3",
    "@angular/cdk": ">=14.1.3"
  },
  "dependencies": {
    "tslib": "^2.2.0",
    "@angular/material": "^14.1.0",
    "@fortawesome/fontawesome-free": "^6.2.1",
    "bootstrap": "^5.2.3",
    "@koalarx/utils": "^1.0.101",
    "rxjs": "~7.5.0"
  }
}), 'utf8');
fs.writeFileSync('dist/README.md', fs.readFileSync('README.md').toString(), 'utf8');
fsExtra.copySync('projects/prebuilt-theme', 'dist/prebuilt-theme')

console.log('Build completed');
