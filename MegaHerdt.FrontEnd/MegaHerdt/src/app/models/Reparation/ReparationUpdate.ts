import { MethodOfPayment } from "src/app/utils/MethodOfPayment";
import { ReparationArticleUpdate } from "../Article/ReparationArticleUpdate";
import { Bill } from "../Bill/Bill";

export class ReparationUpdate {
    id: number;
    reparationStateId: number;
    employeeId: string;
    clientId: string;
    amount: number;
    date: Date;
    reparationsArticles: Array<ReparationArticleUpdate>;
    bill: Bill;
    clientDescription: string;
    employeeObservation: string;
    approximateTime: Date;

    paymentsQuantity: number | null = null;
    // Metodo de pago (Efectivo, debito, credito)
    methodOfPayment: MethodOfPayment | null = null;
    
    constructor(id: number, reparationStateId: number, employeeId: string, clientId: string, amount: number,
        date: Date, reparationsArticles: Array<ReparationArticleUpdate>, bill: Bill, clientDescription: string
        ,employeeObservation: string, approximateTime: Date, paymentsQuantity: number | null = null,
        methodOfPayment: MethodOfPayment|null=null) {
        this.id = id;
        this.reparationStateId = reparationStateId;
        this.employeeId = employeeId;
        this.clientId = clientId;
        this.amount = amount;
        this.date = date;
        this.reparationsArticles = reparationsArticles;
        this.bill = bill;
        this.clientDescription = clientDescription;
        this.employeeObservation = employeeObservation;
        this.approximateTime = approximateTime;
        this.paymentsQuantity = paymentsQuantity;
        this.methodOfPayment = methodOfPayment;
    }

}