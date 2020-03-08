public class ResourceController {
        @AuraEnabled(cacheable=true)
        public static List< DJ_Resource__c> getResourceList()
        {
            return [
                SELECT Id, Name
                FROM  DJ_Resource__c
            ];

        }
    
}
