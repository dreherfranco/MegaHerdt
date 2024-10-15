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
    clientDescription: string;
    employeeObservation: string;
    tipoObjeto: string;

    constructor(reparationStateId: number=0, employeeId: string='', clientId: string='', amount: number=0,
        date: Date= new Date(), reparationsArticles: Array<ReparationArticleCreation>=[], bill: BillCreation= new BillCreation(),
        clientDescription: string='', employeeObservation: string='', tipoObjeto: string = '') 
    {
        this.reparationStateId = reparationStateId;
        this.employeeId = employeeId;
        this.clientId = clientId;
        this.amount = amount;
        this.date = date;
        this.reparationsArticles = reparationsArticles;
        this.bill = bill;
        this.clientDescription = clientDescription;
        this.employeeObservation = employeeObservation;
        this.tipoObjeto = tipoObjeto;

    }

}