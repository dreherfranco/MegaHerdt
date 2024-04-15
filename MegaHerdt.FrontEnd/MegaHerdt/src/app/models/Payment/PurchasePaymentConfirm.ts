import { PurchaseArticleCreation } from "../PurchaseArticle/PurchaseArticleCreation";

export class PurchasePaymentConfirm{
    installments: number;
    clientEmail: string;
    clientId: string;
    payInPerson: boolean;
    purchaseArticles: Array<PurchaseArticleCreation>;
    
    constructor() {
        this.installments = 0;
        this.clientEmail = "";
        this.clientId = "";
        this.payInPerson = false;
        this.purchaseArticles = [];
    }
}