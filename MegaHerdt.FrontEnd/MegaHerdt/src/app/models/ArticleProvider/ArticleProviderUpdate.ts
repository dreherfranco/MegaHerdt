export class ArticleProviderUpdate{
    id: number;
    providerId: number;
    articleId: number;
    provisionDate: Date;
    articleQuantity: number;
    constructor(id: number, providerId: number, articleId: number,provisionDate: Date,articleQuantity: number)
    {
        this.id = id;
        this.providerId = providerId;
        this.articleId = articleId;
        this.provisionDate = provisionDate;
        this.articleQuantity = articleQuantity;
    }
}