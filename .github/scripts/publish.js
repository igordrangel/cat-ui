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
