//Bulkify your Code
trigger accountTestTrggr on Account (before insert, before update) {
 
   //This only handles the first record in the Trigger.new collection
   //But if more than one Account initiated this trigger, those additional records
   //will not be processed
   Account acct = Trigger.new[0];
   List<Contact> contacts = [select id, salutation, firstname, lastname, email
              from Contact where accountId = :acct.Id];
    
}

//Avoid SOQL and Queries in for loops
trigger accountTestTrggr on Account (before insert, before update) {
 
   //For loop to iterate through all the incoming Account records
   for(Account a: Trigger.new) {
           
      //THIS FOLLOWING QUERY IS INEFFICIENT AND DOESN'T SCALE
      //Since the SOQL Query for related Contacts is within the FOR loop, if this trigger is initiated
      //with more than 100 records, the trigger will exceed the trigger governor limit
      //of maximum 100 SOQL Queries.
           
      List<Contact> contacts = [select id, salutation, firstname, lastname, email
                        from Contact where accountId = :a.Id];
       
      for(Contact c: contacts) {
         System.debug('Contact Id[' + c.Id + '], FirstName[' + c.firstname + '],
                                         LastName[' + c.lastname +']');
         c.Description=c.salutation + ' ' + c.firstName + ' ' + c.lastname;
          
         //THIS FOLLOWING DML STATEMENT IS INEFFICIENT AND DOESN'T SCALE
         //Since the UPDATE dml operation is within the FOR loop, if this trigger is initiated
         //with more than 150 records, the trigger will exceed the trigger governor limit
         //of 150 DML Operations maximum.
                                   
         update c;
      }      
   }
} 
