import { ArticleName } from "../Article/ArticleName";
import { ArticleProviderSerialNumber } from "../ArticleProviderSerialNumber/ArticleProviderSerialNumber";
import { ArticleProvider } from "./ArticleProvider";

export class ArticleProviderItem
{
    id: number;
    article: ArticleName | null;
    articleId: number;
    purchasePrice: number;
    articleQuantity: number;
    serialNumbers: Array<ArticleProviderSerialNumber>;
    constructor()
    {
        this.id = 0;
        this.purchasePrice = 0;
        this.article = null;
        this.articleQuantity = 0;
        this.serialNumbers = [];
        this.articleId = 0;
    }
}