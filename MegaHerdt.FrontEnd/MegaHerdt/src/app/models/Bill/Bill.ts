import { Payment } from "../Payment/Payments";

export class Bill{
    id: number;
    number: string;
    type: string;
    payments: Array<Payment>;
    constructor(id:number, number: string, type: string){
        this.id=id;
        this.number=number;
        this.type = type;
        this.payments = [];
    }
}