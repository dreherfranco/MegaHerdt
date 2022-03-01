export class PurchaseClaimCreation{
    clientId: string;
    purchaseId: number;
    description: string;
    date: Date;
    constructor(clientId: string, purchaseId: number, description: string, date: Date){
        this.clientId = clientId;
        this.purchaseId = purchaseId;
        this.description = description;
        this.date = date;
    }
}