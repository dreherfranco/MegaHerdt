import { ReparationArticleSerialNumber } from "./ReparationArticleSerialNumber";

export class ReparationArticle{
    articleId: number;
    articleQuantity: number;
    articlePriceAtTheMoment: number;
    articleName: string;
    serialNumbers: ReparationArticleSerialNumber[];

    constructor(articleId: number=0, articleQuantity: number=0, priceAtTheMoment: number=0, articleName: string='', serialNumbers:ReparationArticleSerialNumber[]=[] ){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
        this.articlePriceAtTheMoment = priceAtTheMoment;
        this.articleName = articleName;
        this.serialNumbers = serialNumbers;
    }
}