export class BillCreation{
    saleNumber: string;
    number: string;
    type: string;
    constructor( saleNumber: string, number: string, type: string){
        this.saleNumber=saleNumber;
        this.number=number;
        this.type = type;
    }
}