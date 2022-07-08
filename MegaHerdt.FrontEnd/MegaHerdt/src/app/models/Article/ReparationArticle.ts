export class ReparationArticle{
    articleId: number;
    articleQuantity: number;
    articlePriceAtTheMoment: number;
    articleName: string;
    constructor(articleId: number, articleQuantity: number, priceAtTheMoment: number, articleName: string){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
        this.articlePriceAtTheMoment = priceAtTheMoment;
        this.articleName = articleName;
    }
}