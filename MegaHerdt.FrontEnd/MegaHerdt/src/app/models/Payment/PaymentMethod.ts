import { MethodOfPayment } from "src/app/utils/MethodOfPayment";

export class PaymentMethod{
    id: number = 0;
    InstallmentQuantity: number = 0;
    startValidity: Date = new Date();
    endValidity: Date = new Date();
    method: MethodOfPayment = MethodOfPayment.Cash;
    
    constructor(){

    }
}