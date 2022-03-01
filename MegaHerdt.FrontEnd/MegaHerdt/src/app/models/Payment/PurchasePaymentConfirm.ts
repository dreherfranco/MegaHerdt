import { PurchaseArticleCreation } from "../PurchaseArticle/PurchaseArticleCreation";

export class PurchasePaymentConfirm{
    installments: number;
    clientEmail: string;
    clientId: string;
    stripeToken: string;
    hasShipment: boolean;
    shipmentAddressId: number;
    purchaseArticles: Array<PurchaseArticleCreation>;
    
    constructor(installments: number,clientEmail: string, clientId: string, stripeToken: string, 
        hasShipment: boolean, shipmentAddressId: number, purchaseArticles: Array<PurchaseArticleCreation>) {
        this.installments = installments;
        this.clientEmail = clientEmail;
        this.clientId = clientId;
        this.stripeToken = stripeToken;
        this.hasShipment = hasShipment;
        this.shipmentAddressId = shipmentAddressId;
        this.purchaseArticles = purchaseArticles;
    }
}