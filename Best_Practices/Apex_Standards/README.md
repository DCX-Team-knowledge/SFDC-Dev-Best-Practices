
# Apex Coding Standards

## Overview
Apex is Salesforce’s language for implementing business logic, triggers, and custom controllers. Use this page to review key coding standards to ensure your code is efficient, maintainable, and scalable. Following these guidelines helps optimize performance, stay within governor limits, and make your code easier to understand and extend.

## Table of Contents
- [Bulkifying Apex Code](#bulkifying-apex-code)
- [Avoid SOQL Queries or DML Statements Inside FOR Loops](#avoid-soql-queries-or-dml-statements-inside-for-loops)


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
     } ```

### Avoid SOQL Queries or DML Statements Inside FOR Loops

[Avoiding SOQL/DML in Apex code](../Apex_Standards/Examples.js#L13) ensures [Governor Limits](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_apexgov.htm) are not hit.
Never place SOQL queries or DML statements inside `for` loops. Doing so can result in multiple queries or operations being executed, leading to performance issues and exceeding Salesforce’s execution limits. Instead, bulkify your operations by moving queries or DML statements outside the loop and processing data in collections.
