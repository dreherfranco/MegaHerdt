import { Brand } from '../ArticleBrand/Brand';
import { Category } from '../ArticleCategory/Category';
import { ArticleOfferDetail } from '../ArticleOffer/ArticleOfferDetail';

export class Article {
    id: number;
    name: string;
    code: string;
    stock: number;
    image: string;
    unitValue: number;
    unitValueWithOffer: number;
    brand: Brand;
    category: Category;
    currentsOffers: ArticleOfferDetail[];
    futureOffers: ArticleOfferDetail[];
    
    constructor(id: number, name: string, code: string, stock: number, image:string, 
        unitValue:number, unitValueWithOffer: number, brand: Brand, category: Category, 
        currentsOffers:ArticleOfferDetail[], futureOffers: ArticleOfferDetail[] ) 
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
    }
}