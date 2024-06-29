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

/**
 * Modelo para seleccionar items con checkbox
 */
export class SerialNumbersSelection {
    serialNumbers: SerialNumbersSelectionItem[];

    constructor(serialNumbers: SerialNumbersSelectionItem[] = [] )
    {       
        this.serialNumbers = serialNumbers;
    }
}

/**
 * Modelo para seleccionar items con checkbox
 */
export class SerialNumbersSelectionItem {
    serialNumber: string;
    selected: boolean; 

    constructor(serialNumber: string = '', selected: boolean = false) 
    {       
        this.serialNumber = serialNumber;
        this.selected = selected;
    }
}