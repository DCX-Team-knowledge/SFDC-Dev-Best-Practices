
# Apex Coding Standards

## Overview
Apex is Salesforce’s language for implementing business logic, triggers, and custom controllers. Use this page to review key coding standards to ensure your code is efficient, maintainable, and scalable. Following these guidelines helps optimize performance, stay within governor limits, and make your code easier to understand and extend.

## Table of Contents
- [Bulkifying Apex Code](#bulkifying-apex-code)
- [Avoid SOQL Queries or DML Statements Inside FOR Loops](#avoid-soql-queries-or-dml-statements-inside-for-loops)
- [Apex Error Handling](#apex-error-handling)
  


### Bulkifying Apex Code

[Bulkifying Apex Code](../Apex_Standards/Examples.js) code ensures efficient handling of large data volumes while staying within Salesforce governor limits. It improves performance and prevents errors by processing multiple records in a single transaction.

```javascript
//Bulkify your Code
trigger accountTestTrggr on Account (before insert, before update) {
 
   //This only handles the first record in the Trigger.new collection
   //But if more than one Account initiated this trigger, those additional records
   //will not be processed
   Account acct = Trigger.new[0];
   List<Contact> contacts = [select id, salutation, firstname, lastname, email
              from Contact where accountId = :acct.Id];
    
}

```

To ensure your Apex code is bulkified and can efficiently handle large volumes of data, follow these best practices:

1. **Use Collections**:
   - Utilize lists, sets, or maps to collect records and process them in bulk rather than one at a time.
     In the example below, the code executes DML operations inside a loop, risking governor limits and inefficiency.
     ```javascript
     trigger AccountTrigger on Account (after insert) {
     for (Account acc : Trigger.new) {
        // Inefficient: DML inside a loop
        insert new Contact(LastName = 'Smith', AccountId = acc.Id);
     }
     }
     ```
     This can be avoided by colleting the records in a list and performing a single DML operation outside the loop, optimizing performance and adhering to best practices.
     ```javascript
     trigger AccountTrigger on Account (after insert) {
     List<Contact> contactsToInsert = new List<Contact>();
     for (Account acc : Trigger.new) {
     // Collect records in bulk
     contactsToInsert.add(new Contact(LastName = 'Smith', AccountId = acc.Id));
     }
      // Perform DML outside the loop
     insert contactsToInsert;
     }
     ```

### Avoid SOQL Queries or DML Statements Inside FOR Loops

[Avoiding SOQL/DML in Apex code](../Apex_Standards/Examples.js#L13) ensures [Governor Limits](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_apexgov.htm) are not hit.
Never place SOQL queries or DML statements inside `for` loops. Doing so can result in multiple queries or operations being executed, leading to performance issues and exceeding Salesforce’s execution limits. Instead, bulkify your operations by moving queries or DML statements outside the loop and processing data in collections.


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

## Custom Exception Handling

Use `AuraHandledException` to send user-friendly error messages in Lightning components (Aura or LWC).  
Example: [AuraHandledException Example](../Apex_Standards/Examples.js#L82)

## Custom Exception Class

Define your own exception class for more flexibility and control over the error types and messaging across different layers of your application.  
Example: [Custom Exception Class Example](../Apex_Standards/Examples.js#L95)

## Handling Null Values

Use the [Safe Navigation Operator](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_SafeNavigationOperator.htm) to avoid throwing exceptions for null values. This simplifies the logic and helps handle null inputs more gracefully without raising exceptions.  
Example: [Null Handling Example](../Apex_Standards/Examples.js#L110)

## Returning a Custom Error Object

Instead of returning a simple string, use a wrapper class to return structured error messages, especially when multiple details need to be conveyed to the client.  
Example: [Custom Error Object Example](../Apex_Standards/Examples.js#L118)

## Best Practices

- Use multiple try-catch blocks for different operations if they require distinct error handling, ensuring that you can handle different errors more effectively.
- Propagate unhandled exceptions if they do not require handling at the current level, allowing higher-level systems to manage the error.
- Always log detailed exceptions for further debugging and analysis to ensure issues can be traced and resolved quickly.

For examples, refer to the [Examples.js](../Apex_Standards/Examples.js) file.

## References

- [Apex Error Handling in LWC](https://developer.salesforce.com/docs/platform/lwc/guide/apex-error-handling.html)
- [Error Handling Best Practices in Lightning and Apex](https://developer.salesforce.com/blogs/2017/09/error-handling-best-practices-lightning-apex)
