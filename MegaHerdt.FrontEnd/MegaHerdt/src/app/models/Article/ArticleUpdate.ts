export class ArticleUpdate {
    id: number;
    name: string;
    code: string;
    stock: number;
    unitValue: number;
    brandId: number;
    categoryId: number;
    hasSerialNumber: boolean;

    constructor(id: number, name: string, code: string, stock: number,
        unitValue:number, brandId: number, categoryId: number, hasSerialNumber: boolean) 
    {       
        this.id = id;
        this.name = name;
        this.code = code;
        this.stock = stock;
        this.unitValue = unitValue;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.hasSerialNumber = hasSerialNumber;
    }
}