export class ArticleCreation {
    name: string;
    code: string;
    image: File;
    stock: number;
    unitValue: number;
    brandId: number;
    categoryId: number;
    hasSerialNumber: boolean;
    
    constructor(name: string, code: string, image: File, stock: number,
        unitValue:number, brandId: number, categoryId: number, hasSerialNumber: boolean) 
    {       
        this.name = name;
        this.code = code;
        this.image = image;
        this.stock = stock;
        this.unitValue = unitValue;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.hasSerialNumber = hasSerialNumber;
    }
}