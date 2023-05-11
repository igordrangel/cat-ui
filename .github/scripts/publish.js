const fs = require("fs");
const fsExtra = require("fs-extra");
const { execSync } = require("child_process");
const config = JSON.parse(fs.readFileSync("package.json").toString());
const currentVersion = config.version;

execSync(`ng build @catrx/ui`, { stdio: "inherit" });

const packageJson = JSON.parse(
  fs
    .readFileSync("dist/@catrx/ui/package.json", { encoding: "utf8" })
    .toString()
);

fs.writeFileSync(
  "dist/@catrx/ui/package.json",
  JSON.stringify({
    ...packageJson,
    version: currentVersion,
    description: config.description,
    repository: {
      type: "git",
      url: "git+https://github.com/igordrangel/cat-ui.git",
    },
    keywords: config.keywords,
    author: "Igor D. Rangel",
    license: config.license,
    bugs: {
      url: "https://github.com/igordrangel/cat-ui/issues",
    },
    homepage: "https://github.com/igordrangel/cat-ui#readme",
    types: "./catrx-ui.d.ts",
    peerDependencies: {
      "@angular/common": "<17.0.0",
      "@angular/core": "<17.0.0",
      "rxjs": "7.5.0",
      "tslib": "2.3.0",
    },
    dependencies: {
      "@fortawesome/fontawesome-free": "6.2.1",
      "@koalarx/utils": "2.0.8",
      "@ng-select/ng-select": "10.0.4",
      "animate.css": "4.1.1",
      "b64-to-blob": "1.2.19",
      "bootstrap": "5.2.3",
      "exceljs": "4.3.0",
      "file-saver": "2.0.5",
      "jwt-decode": "3.1.2",
      "jwt-encode": "1.0.1",
      "ng2-search-filter": "0.5.1",
      "ngx-mask": "15.1.2",
      "ngx-pagination": "6.0.3",
      "ngx-papaparse": "7.0.0"
    },
  }),
  "utf8"
);
fs.writeFileSync(
  "dist/@catrx/ui/README.md",
  fs.readFileSync("README.md").toString(),
  "utf8"
);
fsExtra.copySync("projects/prebuilt-theme", "dist/@catrx/ui/prebuilt-theme");

console.log("Build completed");
