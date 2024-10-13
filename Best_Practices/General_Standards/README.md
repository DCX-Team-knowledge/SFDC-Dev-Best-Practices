# General Coding Standards

## 1. Naming Conventions

- **Classes and Types**: Use PascalCase (e.g., `UserAccount`, `OrderProcessor`).
- **Methods and Functions**: Use camelCase (e.g., `calculateTotal`, `getUserName`).
- **Variables**: Use meaningful and descriptive names in camelCase (e.g., `totalAmount`, `userDetails`).
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`, `PI_VALUE`).
- **File Names**: Use descriptive file names that reflect the content (e.g., `userController.js`, `orderService.py`).

## 3. Code Structure and Organization

- **Modular Code**: Break down large functions or classes into smaller, reusable modules.
- **Single Responsibility**: Each function, method, or class should have a single responsibility.
- **DRY Principle (Don't Repeat Yourself)**: Avoid duplicate code by refactoring common logic into functions or methods.
- **Consistent Ordering**: Keep a consistent order of methods and functions (e.g., public first, then protected, then private).

## 5. Comments and Documentation

- **Inline Comments**: Use inline comments to explain complex logic, but avoid stating the obvious.
- **Function and Class Documentation**: Document functions and classes with clear descriptions of what they do, their parameters, and return types.
- **TODO Comments**: Use TODO comments to mark areas that need improvement or future work.

## 6. Security Best Practices

- **Input Validation**: Always validate and sanitize user input to prevent security vulnerabilities like SQL injection and XSS.
- **Sensitive Data**: Never hardcode sensitive information like API keys or passwords. Use environment variables or secure vaults.
- **Access Control**: Implement proper access control checks to ensure that users only access resources they are authorized to.

## 7. Testing and Quality Assurance

- **Unit Tests**: Write unit tests for functions and methods to ensure they work as expected.
- **Code Coverage**: Aim for high code coverage but prioritize testing critical paths and edge cases.
- **Test-Driven Development (TDD)**: Consider writing tests before implementing functionality when applicable.

## 8. Version Control

- **Commit Messages**: Write clear and concise commit messages describing the changes made.
- **Branching Strategy**: Use a branching strategy like Git Flow or feature branching to manage code changes.
- **Code Reviews**: Use code reviews to catch issues early, share knowledge, and maintain code quality.

## 9. Performance Optimization

- **Efficient Algorithms**: Use efficient algorithms and data structures appropriate for the task.
- **Avoid Premature Optimization**: Optimize code only when necessary and after identifying performance bottlenecks.
- **Resource Management**: Properly manage resources like database connections, file handles, and memory.

## 10. Code Readability and Maintainability

- **Consistent Style**: Stick to a consistent coding style throughout the codebase.
- **Avoid Deep Nesting**: Limit the use of deeply nested loops or conditionals to improve readability.
- **Self-Explanatory Code**: Write code that is self-explanatory; rely on meaningful variable and function names rather than excessive comments.

## 11. Accessibility and Usability (for Frontend Development)

- **Semantic HTML**: Use semantic HTML tags to improve accessibility and SEO.
- **ARIA Attributes**: Use ARIA attributes to enhance accessibility for users with disabilities.
- **Responsive Design**: Ensure the UI is responsive and works well across different devices and screen sizes.

## 12. Code Consistency Tools

- **Linters**: Use linters (like ESLint for JavaScript, Pylint for Python) to enforce coding standards automatically.
- **Code Formatters**: Use formatters (like Prettier or Black) to keep code consistently formatted.
### ***Guide to configure Prettier in order to apply a common style for a project***  

**Install Prettier**
 ```
 npm install
 npm install --save-dev prettier
 npm install --save-dev prettier-plugin-apex
 ```

**Add a couple of scripts to our package.json. These will come in handy when we run prettier from the CLI later:**
```
"scripts": {
    "prettier:format": "./node_modules/.bin/prettier --write '**/*'",
    "prettier:format:apex": "./node_modules/.bin/prettier --write '**/*.{trigger,cls}'",
    "prettier:format:json": "./node_modules/.bin/prettier --write '**/*.{json,yml,yaml}'",
    "prettier:format:visualforce": "./node_modules/.bin/prettier --write '**/*.{cmp,page,component}'",
    "prettier:format:lwc": "./node_modules/.bin/prettier --write '**/lwc/**/*.{html,js}'"
  },
```

  **Configure Prettier for Apex and Visualforce in `.prettierrc`**

  ```
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
```

  **Prettier is not compatible with some of the CLI-generated files by default, add them to `.prettierignore`**

  ```
  .sfdx
.localdevserver
.*ignore
*.*-meta.xml
*.sh
*.log
documentation/**
```

**Configure Your VS Code Workspace**
```
 {
   "editor.formatOnSave": true,
   "editor.formatOnType": true,
   "salesforcedx-vscode-apex.enable-semantic-errors": false,
   "editor.insertSpaces": true,
   "editor.detectIndentation": true,
   "files.insertFinalNewline": true,
   "editor.defaultFormatter": "esbenp.prettier-vscode"
 }
```
**Refrence:** https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/prettier.html
- **Static Analysis**: Use static code analysis tools to identify potential errors and enforce best practices.

Following these coding standards will help ensure your code is clean, maintainable, and secure.
