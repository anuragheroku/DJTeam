import { LightningElement, api } from 'lwc';

export default class ExpertListItem extends LightningElement {

@api resource;


updateResource(event)
{
    this.dispatchEvent(new CustomEvent('updateresource'));
}

}