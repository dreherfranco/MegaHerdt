import { ReparationState } from "../ReparationState/ReparationState";
import { UserDetail } from "../User/UserDetail";

export class ReparationDetail {
    id: number;
    reparationState: ReparationState;
    employee: UserDetail;
    client: UserDetail;
    amount: number;
    date: Date;
    
    constructor(id:number, reparationState: ReparationState, employee: UserDetail, client: UserDetail, 
        amount: number, date: Date) {
        this.id = id;
        this.reparationState = reparationState;
        this.employee = employee;
        this.client = client;
        this.amount = amount;
        this.date = date;
    }

}