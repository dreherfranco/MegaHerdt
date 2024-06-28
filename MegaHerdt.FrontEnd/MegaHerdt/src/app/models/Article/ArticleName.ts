export class ArticleName{
    id: number;
    name: string;
    stock: number;
    hasSerialNumber: boolean;
    constructor(id: number=0, name: string='', stock: number=0,hasSerialNumber: boolean = false){
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.hasSerialNumber = hasSerialNumber;
    }

}