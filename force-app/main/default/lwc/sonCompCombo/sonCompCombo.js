import { LightningElement, track } from 'lwc';



export default class BasiStardard_Combobox_ApiRest extends LightningElement {


 @track value_combo='';

 @track optionList_combo=[];


 renderedCallback

 constructor(){

 super();

 this.load();



 }

 // eslint-disable-next-line @lwc/lwc/no-async-await

 async connectedCallback() {

 

 }

 async loadChartJs() {



 }

 handleChange(event){


 }

 handleClick(event){

 this.load(); 

 }

 async load(){

 fetch('https://data.brreg.no/enhetsregisteret/api/enheter/' , // End point URL

 {

 // Request type

 method:"GET",

 

 headers:{


 }

 })

 .then(response => {

 

 return response.json().then((body) => {

 //console.log(body) ; 

 let exchangeRoot = body['_embedded'];


 // adding data object

 let objArrayData = exchangeRoot['enheter'];

 console.log('organisasjonsnummer[0]:'+ objArrayData[0]['organisasjonsnummer']);

 

 let newArray=[];

 objArrayData.forEach(element =>{ 

 

 var v='organisasjonsnummer:'+element['organisasjonsnummer'];

 console.log(v);

 var x={ label: v, value: element['organisasjonsnummer'] };

 newArray.push(x);

 });

 

 // adding data object to show in UI

 this.optionList_combo = newArray;

 return { response, body };

 })

 })

 

 .then(jsonResponse => {

 //alert('return response');

 window.console.log('jsonResponse ===> '+JSON.stringify(jsonResponse));

 // retriving the response data

 

 })

 

 .catch(error => {

 window.console.log('callout error ===> '+JSON.stringify(error));

 })

 }

}