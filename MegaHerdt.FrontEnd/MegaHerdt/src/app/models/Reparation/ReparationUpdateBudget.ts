export class ReparationUpdateBudget{
    id: number;
    isAccepted: boolean;
    constructor(id:number, isAccepted: boolean){
        this.id = id;
        this.isAccepted = isAccepted;
    }
}