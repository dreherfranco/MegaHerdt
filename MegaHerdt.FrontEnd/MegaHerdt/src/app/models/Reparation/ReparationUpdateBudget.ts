export class ReparationUpdateBudget{
    id: number;
    isAccepted: boolean;
    constructor(id:number, isAccepted: boolean,approximateTime: Date){
        this.id = id;
        this.isAccepted = isAccepted;
    }
}