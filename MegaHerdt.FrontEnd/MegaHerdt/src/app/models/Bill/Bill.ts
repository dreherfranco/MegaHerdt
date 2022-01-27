export class Bill{
    id: number;
    number: number;
    type: string;
    constructor(id:number, number: number, type: string){
        this.id=id;
        this.number=number;
        this.type = type;
    }
}