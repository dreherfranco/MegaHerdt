import { Article } from "../Article/Article";
import { PurchaseArticleCreation } from "../PurchaseArticle/PurchaseArticleCreation";

export class CartArticleDetail{
    article: Article;
    purchaseArticle: PurchaseArticleCreation;
    constructor(article: Article, purchaseArticle: PurchaseArticleCreation){
        this.article = article;
        this.purchaseArticle = purchaseArticle;
    }
}