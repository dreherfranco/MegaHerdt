import { Payment } from "../Payment/Payments";

export class Bill{
    id: number;
    number: number;
    type: string;
    payments: Array<Payment>;
    constructor(id:number, number: number, type: string){
        this.id=id;
        this.number=number;
        this.type = type;
        this.payments = [];
    }
}