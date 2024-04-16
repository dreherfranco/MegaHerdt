import { Article } from './Article';

export class ArticleWithSerialNumbers {
    article: Article;
    serialNumbers: string[] = [];
    
    constructor(article: Article = new Article(), serialNumbers: string[] = []) 
    {       
        this.article = article;
        this.serialNumbers = serialNumbers;
    }
}