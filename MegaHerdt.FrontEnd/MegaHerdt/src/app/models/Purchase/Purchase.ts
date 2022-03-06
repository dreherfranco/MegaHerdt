import { PurchaseArticle } from "../PurchaseArticle/PurchaseArticle";
import { Shipment } from "../Shipment/Shipment";
import { UserDetail } from "../User/UserDetail";

export class Purchase{
    id: number;
    date: Date;
    client: UserDetail;
    shipment: Shipment;
    purchasesArticles: Array<PurchaseArticle>;
    constructor()
    {
        this.id = 0;
        this.date = new Date;
        this.client = new UserDetail('','','','','',[]);
        this.shipment = new Shipment();
        this.purchasesArticles = [];
    }
}