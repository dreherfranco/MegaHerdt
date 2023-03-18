import { Payment } from "../Payment/Payments";

export class Bill{
    id: number;
    number: string;
    saleNumber: string;
    type: string;
    payments: Array<Payment>;
    constructor(id:number, saleNumber: string,number: string, type: string){
        this.id=id;
        this.saleNumber=saleNumber;
        this.number=number;
        this.type = type;
        this.payments = [];
    }
}