export class ReparationArticleCreation{
    articleId: number;
    articleQuantity: number;
    constructor(articleId: number, articleQuantity: number){
        this.articleId = articleId;
        this.articleQuantity = articleQuantity;
    }
}