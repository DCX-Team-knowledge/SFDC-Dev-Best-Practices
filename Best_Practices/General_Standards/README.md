# General Coding Standards

## 1. Naming Conventions

In developing clean and maintainable code, adopting consistent naming conventions is essential. Below are sections detailing each type of naming convention, followed by a summary table.

### Classes and Types

- **Format:** PascalCase
- **Description:** Use PascalCase for class and type names to ensure readability and distinguish them from methods. Each word should start with an uppercase letter.

---

### Methods and Functions

- **Format:** camelCase
- **Description:** Methods and functions use camelCase, where the first word is lowercase and each subsequent word is capitalized. This convention creates a clear distinction between classes and functions.

---

### Variables

- **Format:** camelCase
- **Description:** Use camelCase for variable names, ensuring they are descriptive of their purpose. This promotes readability and helps developers understand the variable’s function in the code.

---

### Constants

- **Format:** UPPER_SNAKE_CASE
- **Description:** Constants should be in uppercase letters with underscores separating words to signify their immutability. This convention makes constants easily distinguishable from mutable variables.

---

### File Names

- **Format:** Lowercase with underscores or hyphens
- **Description:** File names should use lowercase letters with underscores or hyphens separating words, making them descriptive and easy to locate within the file structure.

---

### Interfaces

- **Format:** Prefix `I`, use PascalCase
- **Description:** Interfaces are prefixed with "I" and follow PascalCase to clearly identify them as contracts or templates for other entities.

---

### Enums

- **Format:** PascalCase for the enum name, UPPER_SNAKE_CASE for members
- **Description:** Enum names use PascalCase, while members use uppercase with underscores, making them easily identifiable as constants within the enum.

---

### Boolean Variables

- **Format:** Prefix with `is`, `has`, `can`, or `should` + camelCase
- **Description:** Boolean variables use prefixes like `is`, `has`, `can`, or `should` followed by camelCase, indicating state or capability in a true/false format.

---

### Private Variables

- **Format:** Prefix with an underscore (`_`)
- **Description:** In languages that support encapsulation, private variables may be prefixed with an underscore to signify restricted scope, helping differentiate them from public members.

---

### Event Handlers

- **Format:** Prefix `on` + EventName in PascalCase
- **Description:** Event handlers adopt the `on` prefix followed by the event name in PascalCase, making their purpose as event responders clear.

---

### Factory Functions

- **Format:** Prefix with `create` + PascalCase
- **Description:** Factory functions are prefixed with `create` to signify object creation, making it clear they are intended to instantiate or generate new objects.

---

### Helper Functions and Utility Functions

- **Format:** Use descriptive names that specify the utility’s purpose, optionally prefixed with `get`, `set`, `calculate`, `format`, `parse`, etc.
- **Description:** These functions often perform specific operations and should be named based on the action they perform, making their purpose immediately clear.

---

### Collections or Lists

- **Format:** Plural nouns in camelCase
- **Description:** Collections should use plural nouns in camelCase to easily signify that the variable holds multiple values, improving readability.

---

### Temporary Variables or Loop Counters

- **Format:** Short names (e.g., `i`, `j`, `temp`)
- **Description:** For loop counters or temporary variables, use short names to maintain simplicity in code where brevity is more practical than descriptiveness.

---

### Summary Table of Naming Conventions

| **Type**              | **Convention**            | **Example**                |
|-----------------------|---------------------------|----------------------------|
| **Interfaces**        | Prefix `I`                | `IUserService`             |
| **Enums**             | PascalCase, UPPER_SNAKE   | `PaymentStatus`, `PENDING` |
| **Boolean Variables** | is/has/can/should + Camel | `isActive`, `hasError`     |
| **Private Variables** | `_camelCase`              | `_internalCache`           |
| **Event Handlers**    | `onEventName`             | `onClick`, `onHover`       |
| **Factory Functions** | Prefix `create`           | `createLogger`             |
| **Utility Functions** | Verb-based                | `calculateTotal`           |
| **Collections**       | Plural nouns              | `userList`, `orders`       |
| **Loop Counters**     | Short names               | `i`, `j`, `temp`           |


## 2. Code Structure and Organization

   - **Modular Code:** Break down large functions or classes into smaller, reusable modules. Modularization improves code readability and makes testing and maintenance easier.
   - **Single Responsibility:** Each function, method, or class should handle one responsibility. Adhering to this keeps code manageable and reduces the likelihood of errors.
   - **DRY Principle (Don't Repeat Yourself):** Avoid duplication by refactoring common logic into functions or methods. Reusable code enhances maintainability and reduces redundancy.
   - **Consistent Ordering:** Maintain a consistent order in defining methods and functions (e.g., public methods first, followed by protected, then private). This improves code organization and readability.

| **Type**                  | **Guideline**                   | **Example**                                         |
|---------------------------|---------------------------------|-----------------------------------------------------|
| Modular Code              | Small, reusable modules         | Divide large classes into smaller, focused modules. |
| Single Responsibility     | Single-purpose functions/classes| Each function has one clear responsibility.         |
| DRY Principle             | No duplicate code               | Refactor repeated logic into helper functions.      |
| Consistent Ordering       | Order methods consistently      | Define public, protected, then private methods.     |

---

## 3. Comments and Documentation

   - **Inline Comments:** Use inline comments sparingly to clarify complex logic, but avoid stating the obvious. Inline comments should add value to the understanding of the code.
   - **Function and Class Documentation:** Document functions and classes with concise descriptions of what they do, including details on parameters, return values, and any important side effects.
   - **TODO Comments:** Use TODO comments to mark areas needing future work or improvement. These can serve as reminders for pending enhancements or fixes.

| **Type**                  | **Guideline**                      | **Example**                                                    |
|---------------------------|------------------------------------|----------------------------------------------------------------|
| Inline Comments           | Clarify complex logic             | `// Calculate total with discounts and taxes`                  |
| Function Documentation    | Describe functionality, parameters| Docstring or comment block with parameter descriptions         |
| TODO Comments             | Mark future work or improvements  | `// TODO: Refactor for performance optimization`               |

---

## 4. Security Best Practices

   - **Input Validation:** Always validate and sanitize user input to prevent vulnerabilities like SQL injection, XSS, and more. Input validation is critical for security in any application.
   - **Sensitive Data:** Avoid hardcoding sensitive information like API keys or passwords in the codebase. Instead, use environment variables or secure vaults to store sensitive data safely.
   - **Access Control:** Implement strict access control to ensure users can only access resources they are authorized for. This prevents unauthorized access and protects user data.

| **Type**                  | **Guideline**                      | **Example**                                       |
|---------------------------|------------------------------------|---------------------------------------------------|
| Input Validation          | Sanitize all user input           | `sanitize(input)`, `validateInput()`              |
| Sensitive Data            | Use environment variables         | Avoid `API_KEY` in code, use `process.env.API_KEY`|
| Access Control            | Check user permissions            | Verify roles and permissions before access        |

---

## 5. Testing and Quality Assurance

   - **Unit Tests:** Write unit tests for each function and method to ensure they work as expected, which helps catch issues early.
   - **Code Coverage:** Aim for high code coverage but focus on critical paths and edge cases. Quality of tests is more important than quantity.
   - **Test-Driven Development (TDD):** Consider writing tests before implementing functionality to clarify requirements and improve code reliability.

| **Type**                  | **Guideline**                    | **Example**                                 |
|---------------------------|----------------------------------|---------------------------------------------|
| Unit Tests                | Test individual functions/methods| Write tests for `calculateTotal()` function |
| Code Coverage             | Focus on critical paths          | Ensure main logic paths are thoroughly tested|
| TDD                       | Write tests before functionality | Create test cases before coding features    |

---

## 6. Version Control

   - **Commit Messages:** Use clear and concise commit messages that accurately describe the changes. Well-written messages make the project history easy to understand.
   - **Branching Strategy:** Implement a branching strategy like Git Flow or feature branching to organize code changes and manage releases.
   - **Code Reviews:** Conduct code reviews to catch issues, share knowledge, and maintain code quality. Reviews improve team collaboration and learning.

| **Type**                  | **Guideline**                 | **Example**                                             |
|---------------------------|-------------------------------|---------------------------------------------------------|
| Commit Messages           | Describe changes clearly      | `fix: resolve issue with login error`                   |
| Branching Strategy        | Use feature or Git Flow       | Separate branches for `feature/new-feature`             |
| Code Reviews              | Review code changes           | Conduct reviews on all pull requests before merging     |

---

## 7. Performance Optimization

   - **Efficient Algorithms:** Select algorithms and data structures that are appropriate and efficient for the given task to avoid unnecessary complexity.
   - **Avoid Premature Optimization:** Optimize code only when necessary after identifying performance bottlenecks.
   - **Resource Management:** Properly manage resources like database connections, file handles, and memory to avoid leaks and excessive usage.

| **Type**                  | **Guideline**                  | **Example**                                     |
|---------------------------|--------------------------------|-------------------------------------------------|
| Efficient Algorithms      | Use suitable algorithms       | Prefer `O(log n)` over `O(n^2)` for sorting     |
| Avoid Premature Optimization| Focus on real bottlenecks   | Profile code before optimizing                  |
| Resource Management       | Handle resources properly     | Close database connections after use            |

---

## 8. Code Readability and Maintainability

   - **Consistent Style:** Maintain a consistent coding style throughout the codebase for improved readability and to make collaboration easier.
   - **Avoid Deep Nesting:** Reduce deeply nested loops or conditionals to simplify code structure and enhance readability.
   - **Self-Explanatory Code:** Write self-explanatory code by using meaningful variable and function names instead of excessive comments.

| **Type**                  | **Guideline**                  | **Example**                                     |
|---------------------------|--------------------------------|-------------------------------------------------|
| Consistent Style          | Use a uniform style           | Consistent use of camelCase for variables       |
| Avoid Deep Nesting        | Simplify code                 | Refactor nested logic into smaller functions    |
| Self-Explanatory Code     | Clear, descriptive names      | `calculateDiscount` instead of `calcDisc`       |

---

## 9. Accessibility and Usability (for Frontend Development)

   - **Semantic HTML:** Use semantic HTML tags for better accessibility and SEO. This helps screen readers and search engines understand content structure.
   - **ARIA Attributes:** Apply ARIA attributes to make web applications accessible for users with disabilities.
   - **Responsive Design:** Ensure the UI is responsive across devices and screen sizes for a consistent user experience.

| **Type**                  | **Guideline**                  | **Example**                                     |
|---------------------------|--------------------------------|-------------------------------------------------|
| Semantic HTML             | Use meaningful tags           | Use `<header>`, `<main>`, `<footer>` tags       |
| ARIA Attributes           | Enhance accessibility         | `aria-label="Close"` on buttons                 |
| Responsive Design         | Adapt to various screens      | Use flexible layouts for mobile and desktop     |

---


## 10. Code Tools

- **Visual Studio Code**
The **Visual Studio Code** is essential for developers aiming to boost productivity with VS Code. It provides quick access to key features like powerful editing, code intelligence, and integrated Git support. The guide covers time-saving shortcuts, customization options, and task automation. By following these tips, developers can streamline their workflow, improve efficiency, and fully leverage VS Code’s capabilities to create a more personalized and productive coding environment.
[Read the full guide on the official website](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)

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
    trailingComma: 'none',
    overrides: [
        {
            files: '**/lwc/**/*.html',
            options: {
                tabWidth: 4,
                parser: 'lwc',
            },
        },
        {
            files: '**/*.{cls,trigger,apex}',
            options: {
                apexInsertFinalNewline: true,
                printWidth: 140,
                tabWidth: 4,
            },
        },
        {
            files: '*.{cmp,page,component}',
            options: {
                parser: 'html',
                tabWidth: 4,
            },
        },
    ],
};
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
