
# Apex Coding Standards

## Overview
Apex is Salesforce’s language for implementing business logic, triggers, and custom controllers. Use this page to review key coding standards to ensure your code is efficient, maintainable, and scalable. Following these guidelines helps optimize performance, stay within governor limits, and make your code easier to understand and extend.

## Table of Contents


## Bulkifying Apex Code

[Bulkifying Apex Code](../Apex_Standards/Examples.js) code ensures efficient handling of large data volumes while staying within Salesforce governor limits. It improves performance and prevents errors by processing multiple records in a single transaction.

### Avoid SOQL Queries or DML Statements Inside FOR Loops

[Avoiding SOQL/DML in Apex code](../Apex_Standards/Examples.js) To avoid hitting governor limits, never place SOQL queries or DML statements inside `for` loops. Doing so can result in multiple queries or operations being executed, leading to performance issues and exceeding Salesforce’s execution limits. Instead, bulkify your operations by moving queries or DML statements outside the loop and processing data in collections.
