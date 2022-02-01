export class ReparationArticle{
    articleId: number;
    articleQuantity: number;
    priceAtTheMoment: number;
    articleName: string;
    constructor(articleId: number, articleQuantity: number, priceAtTheMoment: number, articleName: string){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
        this.priceAtTheMoment = priceAtTheMoment;
        this.articleName = articleName;
    }
}