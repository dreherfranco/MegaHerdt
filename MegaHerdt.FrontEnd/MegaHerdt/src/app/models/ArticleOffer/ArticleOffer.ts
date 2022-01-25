export class ArticleOffer{
    id: number;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    articleId: number;

    constructor(id: number, discountPercentage: number, startDate: Date, endDate: Date, articleId: number) 
    {
        this.id = id;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.articleId = articleId;
    }
}