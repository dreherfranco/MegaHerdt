import { PurchaseDebt } from "../Purchase/PurchaseDebt";
import { ReparationDebt } from "../Reparation/ReparationDebt";

export class Debts{
    purchaseDebts: PurchaseDebt[];
    reparationDebts: ReparationDebt[];
    
    constructor(){
        this.purchaseDebts = [];
        this.reparationDebts = [];
    }
}