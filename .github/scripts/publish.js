const fs = require("fs");
const fsExtra = require("fs-extra");
const {execSync} = require("child_process");
const config = JSON.parse(fs.readFileSync('package.json').toString());
const currentVersion = config.version;
const libs = [
  'dynamic-component',
  'snackbar',
  'loader',
  'loader-page',
  'icon-button',
  'button',
  'toolbar',
  'dialog',
  'confirm',
  'utils',
  'datatable',
  'form',
  'common',
  'core'
];

for (const [index, lib] of libs.entries()) {
  execSync(`ng build ${lib} --configuration production`, {stdio: 'ignore'});
  console.log(`[${index + 1} of ${libs.length}] ${lib} built with successfully.`);
}

fs.writeFileSync('dist/package.json', JSON.stringify({
  "name": "@catrx/ui",
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
  "types": "./catrx-ui.d.ts",
  "peerDependencies": {
    "@angular/cli": ">=15.0.0",
    "@angular/common": ">=15.0.0",
    "@angular/core": ">=15.0.0"
  },
  "dependencies": {
    "@angular/material": "^15.0.3",
    "@fortawesome/fontawesome-free": "^6.2.1",
    "@koalarx/utils": "^1.0.101",
    "@ng-select/ng-select": "^10.0.1",
    "animate.css": "^4.1.1",
    "b64-to-blob": "^1.2.19",
    "bootstrap": "^5.2.3",
    "jwt-decode": "^3.1.2",
    "jwt-encode": "^1.0.1",
    "ng2-search-filter": "^0.5.1",
    "ngx-bootstrap": "^6.2.0",
    "ngx-mask": "^14.2.4",
    "ngx-pagination": "^6.0.3",
    "ngx-papaparse": "^6.0.2",
    "rxjs": "~7.5.0",
    "tslib": "^2.3.0",
  }
}), 'utf8');
fs.writeFileSync('dist/README.md', fs.readFileSync('README.md').toString(), 'utf8');
fsExtra.copySync('projects/prebuilt-theme', 'dist/prebuilt-theme')

console.log('Build completed');
