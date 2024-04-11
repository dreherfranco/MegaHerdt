import { PurchaseArticle } from "../PurchaseArticle/PurchaseArticle";
import { PurchaseClaimDetail } from "../PurchaseClaim/PurchaseClaimDetail";
import { Shipment } from "../Shipment/Shipment";
import { UserDetail } from "../User/UserDetail";

export enum PurchaseState {
    Reserved = 0,
    CancelledReservation = 1,
    Paid = 2,
    Delivered = 3
  }

export class Purchase{
    id: number;
    date: Date;
    client: UserDetail;
    shipment: Shipment;
    payInPerson: Boolean;
    state: PurchaseState;
    purchasesArticles: Array<PurchaseArticle>;
    purchasesClaims: Array<PurchaseClaimDetail>;
    constructor()
    {
        this.id = 0;
        this.date = new Date;
        this.client = new UserDetail('','','','','',[]);
        this.shipment = new Shipment();
        this.payInPerson = false;
        this.state = PurchaseState.Reserved;
        this.purchasesArticles = [];
        this.purchasesClaims = [];
    }
}