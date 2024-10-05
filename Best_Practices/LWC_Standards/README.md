Use formtter 
WHY ?
It is generally accepted that having a common style guide is valuable for a project and team
https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/prettier.html
Install Prettier
npm install
npm install --save-dev prettier
npm install --save-dev prettier-plugin-apex
Add a couple of scripts to our package.json. These will come in handy when we run prettier from our CLI later.
"scripts": {
    "prettier:format": "./node_modules/.bin/prettier --write '**/*'",
    "prettier:format:apex": "./node_modules/.bin/prettier --write '**/*.{trigger,cls}'",
    "prettier:format:json": "./node_modules/.bin/prettier --write '**/*.{json,yml,yaml}'",
    "prettier:format:visualforce": "./node_modules/.bin/prettier --write '**/*.{cmp,page,component}'",
    "prettier:format:lwc": "./node_modules/.bin/prettier --write '**/lwc/**/*.{html,js}'"
  },

  Configure Prettier for Apex and Visualforce
  Prettier is not compatible with some of the CLI-generated files by default.
  .prettierignore
  .sfdx
.localdevserver
.*ignore
*.*-meta.xml
*.sh
*.log
documentation/**

.prettierrc
{
  "trailingComma": "none",
  "overrides": [
    {
      "files": "**/lwc/**/*.html",
      "options": {
        "tabWidth": 4,
        "parser": "lwc"
      }
    },
    {
      "files": "**/*.{cls,trigger,apex}",
      "options": {
        "apexInsertFinalNewline": true,
        "printWidth": 140,
        "tabWidth": 4
      }
    },
    {
      "files": "*.{cmp,page,component}",
      "options": {
        "parser": "html",
        "tabWidth": 4
      }
    }
  ]
}
Configure Your VS Code Workspace
{
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "salesforcedx-vscode-apex.enable-semantic-errors": false,
  "editor.insertSpaces": true,
  "editor.detectIndentation": true,
  "files.insertFinalNewline": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
