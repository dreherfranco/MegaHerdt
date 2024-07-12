export class PurchaseArticleCreation{
    articleId: number;
    articleQuantity:number;
    articlePriceAtTheMoment: number;
    articleName: string;
    constructor(articleId: number=0, articleQuantity: number=0, articlePriceAtTheMoment: number=0,articleName: string=''){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
        this.articlePriceAtTheMoment = articlePriceAtTheMoment;
        this.articleName = articleName;
    }
}