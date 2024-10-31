
# Apex Coding Standards

## Overview
Apex is Salesforce’s language for implementing business logic, triggers, and custom controllers. Use this page to review key coding standards to ensure your code is efficient, maintainable, and scalable. Following these guidelines helps optimize performance, stay within governor limits, and make your code easier to understand and extend.


# Apex Coding Best Practices Guide

## Table of Contents
1. [Governor Limits Management](#1-governor-limits-management)
2. [Bulkification](#2-bulkification)
3. [Efficient SOQL and DML Practices](#3-efficient-soql-and-dml-practices)
4. [Security and Data Access Control](#4-security-and-data-access-control)
5. [Asynchronous Apex Usage](#5-asynchronous-apex-usage-future-queueable-batch-scheduled)
6. [Testing and Code Coverage](#6-testing-and-code-coverage)
7. [Trigger Frameworks and Handler Classes](#7-trigger-frameworks-and-handler-classes)
8. [Using Custom Metadata and Custom Settings](#8-using-custom-metadata-and-custom-settings)
9. [Avoiding Recursive Triggers](#9-avoiding-recursive-triggers)
10. [Performance Monitoring and Optimization](#10-performance-monitoring-and-optimization)
11. [Using Limits Class for Resource Management](#11-using-limits-class-for-resource-management)

---

## Scenario Context
This guide uses a **Project Management System** context, involving `Task`, `Project`, and `TeamMember` records. Automation supports team member assignments, project progress calculation, task dependencies, and overdue notifications. Each example demonstrates a best practice relevant to this scenario.

---

### 1. Governor Limits Management

**Importance:** Salesforce enforces governor limits to maintain multi-tenant stability, ensuring that individual applications do not monopolize shared resources. Governor limits include constraints on the number of SOQL queries, DML operations, CPU time, heap size, and more. Writing code without considering these limits can lead to runtime errors, unhandled exceptions, and a poor user experience, especially in scenarios with high data volumes.

**Best Practice:** To stay within governor limits, avoid repetitive DML operations and SOQL queries, process records in bulk, and manage memory efficiently. By adhering to governor limits, developers can ensure their code remains efficient, scalable, and stable.

[Example in project_management_examples.java](project_management_examples.java)  
[Salesforce Documentation - Governor Limits](https://developer.salesforce.com/docs/atlas.en-us.224.0.apexcode.meta/apexcode/apex_gov_limits.htm)

---

### 2. Bulkification

**Importance:** Bulkification is crucial for handling multiple records in a single operation, especially in a multi-user system where multiple records might be processed simultaneously (e.g., batch processes or triggers on large datasets). Writing bulkified code prevents governor limit errors, minimizes DML and SOQL operations, and optimizes performance.

**Best Practice:** Always assume that a trigger or batch process will handle multiple records. Design logic that can efficiently process collections rather than individual records. For example, in the case of assigning team members to tasks, bulkified code ensures that all assignments are made in a single DML operation rather than individual DML operations within a loop.

[Example in project_management_examples.java](project_management_examples.java)  
[Salesforce Documentation - Bulk Apex Triggers](https://developer.salesforce.com/docs/atlas.en-us.224.0.apexcode.meta/apexcode/apex_triggers_best_pract.htm)

---

### 3. Efficient SOQL and DML Practices

**Importance:** Inefficient SOQL queries and DML operations lead to governor limit violations, slowing down processes and increasing CPU time usage. This practice ensures that queries are optimized and minimizes the number of DML operations performed, both of which are key to maintaining optimal performance.

**Best Practice:** Avoid querying within loops and limit the number of DML operations. Use relationship queries whenever possible to retrieve related records efficiently, as demonstrated in calculating project progress based on task completion. This reduces unnecessary queries, enhances readability, and optimizes resource usage.

[Example in project_management_examples.java](project_management_examples.java)  
[Salesforce Documentation - SOQL and DML Operations](https://developer.salesforce.com/docs/atlas.en-us.224.0.apexcode.meta/apexcode/langCon_apex_SOQL_VLSQ.htm)

---

### 4. Security and Data Access Control

**Importance:** Ensuring proper field- and object-level security (FLS and OLS) protects sensitive data, and compliance is critical for data privacy. Ignoring these considerations could inadvertently expose sensitive data to users who lack appropriate access.

**Best Practice:** Always check user permissions programmatically before accessing or modifying sensitive data. This not only ensures compliance with Salesforce security protocols but also builds trust with users by enforcing access restrictions, as illustrated by checking permissions before updating task ownership in the Project Management System.

[Example in project_management_examples.java](project_management_examples.java)  
[Salesforce Documentation - Security and Data Access](https://developer.salesforce.com/docs/atlas.en-us.224.0.apexcode.meta/apexcode/apex_classes_perms_enforcing.htm)

---

### 5. Asynchronous Apex Usage (Future, Queueable, Batch, Scheduled)

**Importance:** Asynchronous Apex methods enable background processing for resource-heavy tasks, helping to avoid governor limits during synchronous operations. Different asynchronous methods serve specific purposes, and selecting the right one based on the task ensures optimal performance and code maintainability.

**Asynchronous Method Best Practices:**
- **Future Methods:** Simple to implement but cannot return results or chain jobs. Best for lightweight operations like external callouts. Avoid using them for complex tasks due to limited flexibility.
- **Queueable Apex:** Supports complex jobs and job chaining, allowing the handling of more sophisticated use cases, such as updating data from external sources. Queueable jobs are preferred over future methods due to the added control and flexibility.
- **Batch Apex:** Designed for processing large datasets asynchronously, batch jobs support retry functionality and allow for breaking tasks into manageable chunks. Ideal for periodic data processing like recalculating project statuses or overdue notifications on all records.
- **Scheduled Apex:** Runs at a defined schedule (e.g., nightly), ideal for recurring tasks like sending overdue notifications. Schedule jobs that don’t require immediate execution and need to run during low-traffic hours to reduce server load.

**Best Practice:** For complex jobs with multiple stages, use Queueable Apex. Use Batch Apex for processing large datasets and Scheduled Apex for time-bound recurring tasks. This approach optimizes resource use and enables scalable, maintainable solutions.

[Example in project_management_examples.java](project_management_examples.java)  
[Salesforce Documentation - Asynchronous Apex](https://developer.salesforce.com/docs/atlas.en-us.224.0.apexcode.meta/apexcode/apex_async_overview.htm)

---

### 6. Testing and Code Coverage

**Importance:** Testing validates that code functions as intended, reducing bugs in production. High code coverage is mandatory in Salesforce, with a 75% minimum required for deployment. However, testing should go beyond mere coverage to ensure comprehensive validation, including both positive and negative test cases. Negative testing ensures that edge cases and error scenarios are handled gracefully, protecting the system from unexpected user actions or data inconsistencies.

**Best Practice Guidelines:**
- **Positive Testing:** Verify that the code performs as expected under normal conditions, e.g., assigning team members successfully.
- **Negative Testing:** Ensure the code handles invalid inputs or user permissions correctly. This minimizes runtime errors and enhances user experience by handling failures predictably.
- **Bulk Testing:** Test with multiple records to confirm bulkification and avoid hitting governor limits.
- **Edge Cases:** Consider scenarios with maximum data loads, null values, and unusual conditions. Comprehensive edge-case testing improves the robustness of the application.

**Consequences of Inadequate Testing:** Without thorough tests, including negative cases, bugs slip into production, causing potential system downtime, data corruption, or security issues. Low test coverage leaves code vulnerable to regressions, making maintenance difficult and increasing long-term costs.

[Example in project_management_examples.java](project_management_examples.java)  
[Salesforce Documentation - Apex Testing](https://developer.salesforce.com/docs/atlas.en-us.224.0.apexcode.meta/apexcode/apex_testing.htm)


### Apex Error Handling

# [Apex Error Handling Best Practices](#apex-error-handling-best-practices)

As Apex developers, it's essential to handle errors consistently across projects. This guide covers best practices for managing exceptions in Salesforce applications, with examples to help you implement effective error handling strategies.

## General Guidelines

- **Use Try-Catch Blocks:** Wrap code that might throw exceptions in try-catch blocks to handle errors smoothly and avoid unhandled exceptions from breaking your app.  
  Example: [Try-Catch Example](../Apex_Standards/Examples.js#L42)

- **Handle Specific Exceptions:** Catch specific exceptions like `DmlException` or `QueryException` instead of a generic `Exception` to make debugging easier.  
  Example: [Specific Exception Handling Example](../Apex_Standards/Examples.js#L54)

- **Throw Custom Exceptions:** Create and throw custom exceptions for unique cases to improve readability and provide clearer error messages.  
  Example: [Custom Exception Example](../Apex_Standards/Examples.js#L68)
- **Use multiple try-catch blocks** for different operations if they require distinct error handling, ensuring that you can handle different errors more 
   effectively.
- **Propagate unhandled exceptions** if they do not require handling at the current level, allowing higher-level systems to manage the error.
- **Always log detailed exceptions** for further debugging and analysis to ensure issues can be traced and resolved quickly.

## Common Apex Exception Handling Patterns

| **Exception Type**          | **Description**                                                                                      | **Example**                                                                                           |
|-----------------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **AuraHandledException**     | Send user-friendly error messages in Aura/LWC using `AuraHandledException`.                         | [AuraHandledException Example](../Apex_Standards/Examples.js#L82)                   |
| **Custom Exception Class**   | Define and throw custom exception classes for advanced error control.                               | [Custom Exception Class Example](../Apex_Standards/Examples.js#L95)                 |
| **Null Handling**            | Use the safe navigation operator to handle null values without raising exceptions.                  | [Null Handling Example](../Apex_Standards/Examples.js#L110)                                   |
| **Custom Error Object**      | Return a structured error object using a wrapper class for detailed error messaging.                | [Custom Error Object Example](../Apex_Standards/Examples.js#L118)                       |

## References

- [Apex Error Handling in LWC](https://developer.salesforce.com/docs/platform/lwc/guide/apex-error-handling.html)
- [Error Handling Best Practices in Lightning and Apex](https://developer.salesforce.com/blogs/2017/09/error-handling-best-practices-lightning-apex)
