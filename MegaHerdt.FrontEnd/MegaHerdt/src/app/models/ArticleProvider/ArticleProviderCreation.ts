import { ArticleProviderItem } from "./ArticleProviderItem";

export class ArticleProviderCreation{
    providerId: number;
    voucher: File;
    provisionDate: Date;
    add: boolean;
    discountReason: string;
    articlesItems: Array<ArticleProviderItem>;
    constructor(providerId: number,  voucher: File,provisionDate: Date, add: boolean)
    {
        this.providerId = providerId;
        this.voucher = voucher;
        this.provisionDate = provisionDate;
        this.add = add;
        this.discountReason='';
        this.articlesItems = [];
    }
}