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
        this.article = this.instanceArticle();
        this.serialNumbers = [];
    }

    instanceArticle(): Article{
        return new Article(0,'','',0,'',0,0, new Brand(0,''), new Category(0,''), [], [])
    }
}