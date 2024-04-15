import { PaymentMethod } from "./PaymentMethod";

export class Payment{
    id: number;
    amount: number;
    paymentDate: Date;
    tax: number;
    paymentMethod: PaymentMethod | null = new PaymentMethod();
    constructor(){
        this.id = 0;
        this.amount = 0;
        this.paymentDate = new Date();
        this.tax = 0;
    }
}