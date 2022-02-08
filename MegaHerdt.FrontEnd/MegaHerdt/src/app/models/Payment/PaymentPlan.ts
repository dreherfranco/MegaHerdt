export class PaymentPlan {
    count: number;
    interval: string;
    type: string;
    constructor(count:number,
      interval: string,
      type: string){
        this.count = count;
        this.interval = interval;
        this.type= type;
    }
}