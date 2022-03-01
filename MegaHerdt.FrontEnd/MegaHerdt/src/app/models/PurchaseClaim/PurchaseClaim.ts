import { Purchase } from "../Purchase/Purchase";

export class PurchaseClaim{
    id: number;
    clientId: string;
    purchaseId: number;
    description: string;
    date: Date;
    answered: boolean;
    purchase: Purchase;
    constructor(id: number, clientId: string, purchaseId: number, description: string, date: Date, answered: boolean){
        this.id = id;
        this.clientId = clientId;
        this.purchaseId = purchaseId;
        this.description = description;
        this.date = date;
        this.answered = answered;
        this.purchase = new Purchase();
    }
}