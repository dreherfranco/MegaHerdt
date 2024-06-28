import { Brand } from '../ArticleBrand/Brand';
import { Category } from '../ArticleCategory/Category';
import { ArticleOfferDetail } from '../ArticleOffer/ArticleOfferDetail';

export class Article {
    id: number;
    name: string;
    hasSerialNumber:boolean;
    code: string;
    stock: number;
    image: string;
    unitValue: number;
    unitValueWithOffer: number;
    brand: Brand;
    category: Category;
    currentsOffers: ArticleOfferDetail[];
    futureOffers: ArticleOfferDetail[];
    
    constructor(id: number=0, name: string='', code: string='', stock: number=0, image:string='', 
        unitValue:number=0, unitValueWithOffer: number=0, brand: Brand=new Brand(), category: Category=new Category(), 
        currentsOffers:ArticleOfferDetail[] = [], futureOffers: ArticleOfferDetail[] = [], hasSerialNumber: boolean = false) 
    {       
        this.id = id;
        this.name = name;
        this.code = code;
        this.stock = stock;
        this.image = image;
        this.unitValue = unitValue;
        this.unitValueWithOffer = unitValueWithOffer;
        this.brand = brand;
        this.category = category;
        this.currentsOffers = currentsOffers;
        this.futureOffers = futureOffers;
        this.hasSerialNumber = hasSerialNumber;
    }
}