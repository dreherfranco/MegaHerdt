import { ReparationArticle } from "../Article/ReparationArticle";
import { Bill } from "../Bill/Bill";

export class ReparationUpdate {
    id: number;
    reparationStateId: number;
    employeeId: string;
    clientId: string;
    amount: number;
    date: Date;
    reparationsArticles: Array<ReparationArticle>;
    bill: Bill;
    
    constructor(id: number, reparationStateId: number, employeeId: string, clientId: string, amount: number,
        date: Date, reparationsArticles: Array<ReparationArticle>, bill: Bill,) {
        this.id = id;
        this.reparationStateId = reparationStateId;
        this.employeeId = employeeId;
        this.clientId = clientId;
        this.amount = amount;
        this.date = date;
        this.reparationsArticles = reparationsArticles;
        this.bill = bill;
    }

}