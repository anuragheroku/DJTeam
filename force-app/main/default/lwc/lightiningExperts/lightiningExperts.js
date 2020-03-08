import { LightningElement, wire } from "lwc";
import getResourceList from "@salesforce/apex/ResourceController.getResourceList";

export default class LightiningExperts extends LightningElement {
  chosenResource;

  @wire(getResourceList) resources;
  enumn = 1;

  handleChosen(eve) {
    console.log("here");
    const resourceId = eve.detail;
    this.chosenResource = this.resources.data.find(
      resource => resource.Id === resourceId
    );
  }
}
