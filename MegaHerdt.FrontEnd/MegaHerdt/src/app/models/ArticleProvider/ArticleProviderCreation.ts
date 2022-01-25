export class ArticleProviderCreation{
    providerId: number;
    articleId: number;
    voucher: File;
    provisionDate: Date;
    articleQuantity: number;
    constructor(providerId: number, articleId: number, voucher: File,provisionDate: Date,articleQuantity: number)
    {
        this.providerId = providerId;
        this.articleId = articleId;
        this.voucher = voucher;
        this.provisionDate = provisionDate;
        this.articleQuantity = articleQuantity;
    }
}