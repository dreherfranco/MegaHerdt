export class ArticleCreation {
    name: string;
    code: string;
    image: File;
    stock: number;
    unitValue: number;
    brandId: number;
    categoryId: number;
    
    constructor(name: string, code: string, image: File, stock: number,
        unitValue:number, brandId: number, categoryId: number) 
    {       
        this.name = name;
        this.code = code;
        this.image = image;
        this.stock = stock;
        this.unitValue = unitValue;
        this.brandId = brandId;
        this.categoryId = categoryId;
    }
}