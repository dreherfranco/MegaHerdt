export class ReparationArticleAdded{
    articleName: string;
    articleQuantity: number;
    constructor(articleName: string, articleQuantity: number){
        this.articleName = articleName;
        this.articleQuantity = articleQuantity;
    }
}