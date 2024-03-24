import { Provider } from "../Provider/Provider";
import { ArticleProviderItem } from "./ArticleProviderItem";

export class ArticleProvider
{
    id: number;
    provider: Provider;
    voucher: string;
    provisionDate: Date;
    add: boolean;
    discountReason: string;
    articlesItems: Array<ArticleProviderItem>;
    constructor(id: number, provider: Provider,  voucher: string,provisionDate: Date)
    {
        this.id = id;
        this.provider = provider;
        this.voucher = voucher;
        this.provisionDate = provisionDate;
        this.add = true;
        this.discountReason='';
        this.articlesItems = [];
    }
}