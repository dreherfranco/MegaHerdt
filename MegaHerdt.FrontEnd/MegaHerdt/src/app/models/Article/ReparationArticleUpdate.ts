export class ReparationArticleUpdate{
    articleId: number;
    articleQuantity: number;
    articlePriceAtTheMoment: number;
    constructor(articleId: number, articleQuantity: number, articlePriceAtTheMoment: number){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
        this.articlePriceAtTheMoment = articlePriceAtTheMoment;
    }
}