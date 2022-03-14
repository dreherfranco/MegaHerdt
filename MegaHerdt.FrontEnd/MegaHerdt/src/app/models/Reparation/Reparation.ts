import { ReparationArticle } from "../Article/ReparationArticle";
import { Bill } from "../Bill/Bill";
import { ReparationClaimDetail } from "../ReparationClaims/ReparationClaimDetail";
import { ReparationState } from "../ReparationState/ReparationState";
import { UserDetail } from "../User/UserDetail";

export class Reparation {
    id: number;
    reparationState: ReparationState;
    employee: UserDetail;
    client: UserDetail;
    amount: number;
    date: Date;
    reparationsArticles: Array<ReparationArticle>;
    bill: Bill;
    reparationsClaims: Array<ReparationClaimDetail>;

    constructor(id:number, reparationState: ReparationState, employee: UserDetail, client: UserDetail, amount: number,
        date: Date, reparationsArticles: Array<ReparationArticle>, bill: Bill) {
        this.id = id;
        this.reparationState = reparationState;
        this.employee = employee;
        this.client = client;
        this.amount = amount;
        this.date = date;
        this.reparationsArticles = reparationsArticles;
        this.bill = bill;
        this.reparationsClaims = [];
    }

}