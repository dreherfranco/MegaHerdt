import { ReparationArticleCreation } from "../Article/ReparationArticleCreation";
import { BillCreation } from "../Bill/BillCreation";

export class ReparationCreation {
    reparationStateId: number;
    employeeId: string;
    clientId: string;
    amount: number;
    date: Date;
    reparationsArticles: Array<ReparationArticleCreation>;
    bill: BillCreation;
    
    constructor(reparationStateId: number, employeeId: string, clientId: string, amount: number,
        date: Date, reparationsArticles: Array<ReparationArticleCreation>, bill: BillCreation,) {
        this.reparationStateId = reparationStateId;
        this.employeeId = employeeId;
        this.clientId = clientId;
        this.amount = amount;
        this.date = date;
        this.reparationsArticles = reparationsArticles;
        this.bill = bill;
    }

}