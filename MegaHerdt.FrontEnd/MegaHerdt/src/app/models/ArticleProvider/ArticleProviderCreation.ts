import { ArticleProviderSerialNumberCreation } from "../ArticleProviderSerialNumber/ArticleProviderSerialNumberCreation";

export class ArticleProviderCreation{
    providerId: number;
    articleId: number;
    voucher: File;
    provisionDate: Date;
    articleQuantity: number;
    add: boolean;
    discountReason: string;
    serialNumbers: Array<string>;
    constructor(providerId: number, articleId: number, voucher: File,provisionDate: Date,articleQuantity: number, add: boolean)
    {
        this.providerId = providerId;
        this.articleId = articleId;
        this.voucher = voucher;
        this.provisionDate = provisionDate;
        this.articleQuantity = articleQuantity;
        this.add = add;
        this.discountReason='';
        this.serialNumbers = [];
    }
}