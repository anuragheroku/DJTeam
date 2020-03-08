public class ResourceController {
        @AuraEnabled(cacheable=true)
        public static List< DJ_Resource__c> getResourceList()
        {
            return [
                SELECT Id, First_Name__c, Last_Name__c, Primary_Salesforce_Role__c, Resource_Description__c,Available_from_Date__c
                FROM  DJ_Resource__c
            ];

        }
    
}
