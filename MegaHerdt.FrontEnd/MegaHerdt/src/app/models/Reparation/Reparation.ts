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
    diagnostic: string;
    totalArticleAmount: number; 
    approximateTime: Date;
    numeroTicket:  string;
    facturada:  boolean;
    //Cantidad de pagos de la reparación
    paymentsQuantity: number | null = null;
    // Metodo de pago (Efectivo, debito, credito)
    methodOfPayment: MethodOfPayment | null = null;
    tipoObjeto: string;

    constructor(id:number = 0, reparationState: ReparationState = new ReparationState(), employee: UserDetail=new UserDetail(), client: UserDetail=new UserDetail(), amount: number=0,
        date: Date= new Date(), reparationsArticles: Array<ReparationArticle>=[], bill: Bill= new Bill(), employeeObservation: string='', diagnostic: string='', numeroTicket:  string='',
        facturada:  boolean=false, tipoObjeto: string = '') {
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
        this.diagnostic = diagnostic;
        this.totalArticleAmount = 0;
        this.approximateTime = new Date();
        this.numeroTicket = numeroTicket;
        this.facturada = facturada;
        this.tipoObjeto = tipoObjeto;
    }

}