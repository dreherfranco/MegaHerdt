import { ReparationArticleSerialNumber } from "./ReparationArticleSerialNumber";

export class ReparationArticleUpdate{
    articleId: number;
    articleQuantity: number;
    articlePriceAtTheMoment: number;
    serialNumbers: ReparationArticleSerialNumber[];

    constructor(articleId: number, articleQuantity: number, articlePriceAtTheMoment: number, serialNumbers: ReparationArticleSerialNumber[] = []){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
        this.articlePriceAtTheMoment = articlePriceAtTheMoment;
        this.serialNumbers = serialNumbers;
    }
}