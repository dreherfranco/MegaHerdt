import { Article } from "../Article/Article";

export class ArticleOffer{
    id: number;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    articleId: number;
    article: Article;

    constructor(id: number=0, discountPercentage: number=0, startDate: Date=new Date(), 
                 endDate: Date=new Date(), articleId: number=0, article: Article = new Article()) 
    {
        this.id = id;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.articleId = articleId;
        this.article = article;
    }
}