export class ReparationArticle{
    articleId: number;
    articleQuantity: number;
    priceAtTheMoment: number;
    constructor(articleId: number, articleQuantity: number, priceAtTheMoment: number){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
        this.priceAtTheMoment = priceAtTheMoment;
    }
}