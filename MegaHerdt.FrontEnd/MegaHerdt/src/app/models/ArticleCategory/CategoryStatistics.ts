export class CategoryStatistics{
    id: number;
    name: string;
    articlesQuantity: number;
    purchasesQuantity: number;
    reparationsQuantity: number;
    constructor(){
        this.id = 0;
        this.name = '';
        this.articlesQuantity = 0;
        this.purchasesQuantity = 0;
        this.reparationsQuantity = 0;
    }
}