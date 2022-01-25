export class ArticleOfferCreation{
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    articleId: number;

    constructor(discountPercentage: number, startDate: Date, endDate: Date, articleId: number) 
    {
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.articleId = articleId;
    }
}