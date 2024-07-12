import { Article } from "../Article/Article";
import { Brand } from "../ArticleBrand/Brand";
import { Category } from "../ArticleCategory/Category";
import { PurchaseArticleSerialNumber } from "../PurchaseArticleSerialNumber/PurchaseArticleSerialNumber";

export class PurchaseArticle{
    articleQuantity:number;
    articlePriceAtTheMoment: number;
    article: Article;
    serialNumbers: PurchaseArticleSerialNumber[];

    constructor(){
        this.articlePriceAtTheMoment = 0;
        this.articleQuantity = 0;
        this.article = new Article();
        this.serialNumbers = [];
    }


}