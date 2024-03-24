export class ArticleName{
    id: number;
    name: string;
    stock: number;

    constructor(id: number=0, name: string='', stock: number=0){
        this.id = id;
        this.name = name;
        this.stock = stock;
    }

}