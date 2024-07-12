export class ArticleCreation {
    name: string;
    code: string;
    description: string;
    image: File;
    stock: number;
    unitValue: number;
    brandId: number;
    categoryId: number;
    hasSerialNumber: boolean;
    
    constructor(name: string = '', code: string = '', description: string = '', image: File = new File([], ''), stock: number=0,
        unitValue:number=0, brandId: number=0, categoryId: number=0, hasSerialNumber: boolean=false) 
    {       
        this.name = name;
        this.code = code;
        this.description = description;
        this.image = image;
        this.stock = stock;
        this.unitValue = unitValue;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.hasSerialNumber = hasSerialNumber;
    }
}