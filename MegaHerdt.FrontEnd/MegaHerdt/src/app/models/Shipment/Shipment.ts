import { AddressUpdate } from "../Address/AddressUpdate";
import { TransportCompany } from "../TransportCompany/TransportCompany";

export class Shipment{
    id: number;
    purchaseId: number;
    shipmentDate: Date;
    amount: number;
    trackingNumber: number;
    address: AddressUpdate;
    transportCompany: TransportCompany;
    constructor(){
        this.id = 0;
        this.purchaseId = 0;
        this.shipmentDate = new Date();
        this.amount = 0;
        this.trackingNumber = 0;
        this.address = new AddressUpdate(0,'',0,'',0,'','','');
        this.transportCompany = new TransportCompany();

    }
}