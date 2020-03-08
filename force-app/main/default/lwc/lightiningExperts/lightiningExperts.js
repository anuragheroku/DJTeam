import { LightningElement, wire } from "lwc";
import getResourceList from "@salesforce/apex/ResourceController.getResourceList";

export default class LightiningExperts extends LightningElement {
  chosenResource;

  @wire(getResourceList) resources;

  handleChosen(eve) {
    console.log("here");
    const resourceId = eve.detail;
    this.chosenResource = this.resources.data.find(
      resource => resource.Id === resourceId
    );
  }

  handleClick() {
    //firing an child method
    this.template.querySelector("c-expert-list-item").handleValueChange();
  }

  handleSayHi()
  {
    alert("Hi there");

  }


}
