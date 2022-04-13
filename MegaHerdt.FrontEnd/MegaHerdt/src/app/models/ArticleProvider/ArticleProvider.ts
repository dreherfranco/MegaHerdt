import { ArticleName } from "../Article/ArticleName";
import { Provider } from "../Provider/Provider";

export class ArticleProvider{
    id: number;
    provider: Provider;
    article: ArticleName;
    voucher: string;
    provisionDate: Date;
    articleQuantity: number;
    add: boolean;
    constructor(id: number, provider: Provider, article: ArticleName, voucher: string,provisionDate: Date,articleQuantity: number)
    {
        this.id = id;
        this.provider = provider;
        this.article = article;
        this.voucher = voucher;
        this.provisionDate = provisionDate;
        this.articleQuantity = articleQuantity;
        this.add = true;
    }
}