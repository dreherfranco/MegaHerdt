export class ReparationUpdateBudget{
    id: number;
    isAccepted: boolean;
    approximateTime: Date;
    constructor(id:number, isAccepted: boolean,approximateTime: Date){
        this.id = id;
        this.isAccepted = isAccepted;
        this.approximateTime = approximateTime;
    }
}