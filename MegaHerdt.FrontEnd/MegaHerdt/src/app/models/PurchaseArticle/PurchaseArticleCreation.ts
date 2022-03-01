export class PurchaseArticleCreation{
    articleId: number;
    articleQuantity:number;
    articlePriceAtTheMoment: number;
    articleName: string;
    constructor(articleId: number, articleQuantity: number, articlePriceAtTheMoment: number,articleName: string){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
        this.articlePriceAtTheMoment = articlePriceAtTheMoment;
        this.articleName = articleName;
    }
}