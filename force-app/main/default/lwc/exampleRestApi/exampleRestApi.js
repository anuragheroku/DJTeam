import { LightningElement, track } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Address_FIELD from '@salesforce/schema/Account.BillingAddress';
import Employee_FIELD from '@salesforce/schema/Account.NumberOfEmployees';




const QUERY_URL =
    'https://data.brreg.no/enhetsregisteret/api/enheter/';


export default class CreateAccount extends LightningElement {
    @track searchKey = '';
    @track org =false;
    @track error;
    @track accountId;
    @track value = 'VELFAC';
    ready=0;


    name = '';


    get selectOptions() {

        //var data;
        var selectOptions=[];

        fetch(QUERY_URL)
            .then(response => {
                // fetch isn't throwing an error if the request fails.
                // Therefore we have to check the ok property.
           
                   return response.json();
                


            }).then(data => {
                // Work with JSON data here
                console.log('here',JSON.stringify(data._embedded.enheter))
                console.log('here2',data._embedded.enheter)

                for (let index = 0; index < data._embedded.enheter.length; index++) {
                    const element = data._embedded.enheter[index].organisasjonsnummer;
                    console.log('organisasjonsnummer',element)

                    const value = data._embedded.enheter[index].navn;
                    console.log('val',value)

                    selectOptions[index]={label:element,value:value}




                }

                console.log('combo',selectOptions)




              })
              .catch(err => {
                console.log('errorr',err)
              });
        ready=1;
        return selectOptions;


        /*return [
            { label: 'Test Picklist value', value: '' },
            { label: 'Test Picklist value', value: '' },
        ];*/



        /*return [
            { label: 'organisasjonsnummer', value: '' },
            { label: 'Test Picklist value', value: '' },
        ];*/
    }



    handleChange(event) {
        this.value = event.detail.value;
    }

    handleNameChange(event) {
        this.accountId = undefined;
        this.name = event.target.value;
   }


    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;


    }

    handleSearchClick() {
        // The Fetch API is currently not polyfilled for usage in IE11.
        // Use XMLHttpRequest instead in that case.
        fetch(QUERY_URL + this.searchKey)
            .then(response => {
                // fetch isn't throwing an error if the request fails.
                // Therefore we have to check the ok property.
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();

            })

            .then(jsonResponse => {
                this.org = jsonResponse;

            })
            .catch(error => {
                this.error = error;
                this.org = undefined;
            });

    }



    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[Address_FIELD.fieldApiName] = '';
        fields[Employee_FIELD.fieldApiName] = '';
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                this.org=false;
                this.searchKey='';
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success'
                    })
                );
            })
        }
    }


