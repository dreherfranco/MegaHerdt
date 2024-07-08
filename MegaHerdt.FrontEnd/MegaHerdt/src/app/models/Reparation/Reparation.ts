import { MethodOfPayment } from "src/app/utils/MethodOfPayment";
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
    clientDescription: string;
    employeeObservation: string;
    totalArticleAmount: number; 
    approximateTime: Date;
    numeroTicket:  string;
    facturada:  boolean;
    //Cantidad de pagos de la reparación
    paymentsQuantity: number | null = null;
    // Metodo de pago (Efectivo, debito, credito)
    methodOfPayment: MethodOfPayment | null = null;

    constructor(id:number, reparationState: ReparationState, employee: UserDetail, client: UserDetail, amount: number,
        date: Date, reparationsArticles: Array<ReparationArticle>, bill: Bill, employeeObservation: string, numeroTicket:  string,facturada:  boolean) {
        this.id = id;
        this.reparationState = reparationState;
        this.employee = employee;
        this.client = client;
        this.amount = amount;
        this.date = date;
        this.reparationsArticles = reparationsArticles;
        this.bill = bill;
        this.reparationsClaims = [];
        this.clientDescription = "";
        this.employeeObservation = employeeObservation;
        this.totalArticleAmount = 0;
        this.approximateTime = new Date();
        this.numeroTicket = numeroTicket;
        this.facturada = facturada;
    }

}