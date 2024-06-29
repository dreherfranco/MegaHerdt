import { Article } from './Article';

export class ArticleWithSerialNumbers {
    article: Article;
    serialNumbers: string[] = [];
    discountReason: string;

    constructor(article: Article = new Article(), serialNumbers: string[] = [], discountReason: string = '') 
    {       
        this.article = article;
        this.serialNumbers = serialNumbers;
        this.discountReason = discountReason;
    }
}

/**
 * Modelo para seleccionar items con checkbox
 */
export class SerialNumbersSelection {
    serialNumbers: SerialNumbersSelectionItem[];
    discountReason: string;

    constructor(serialNumbers: SerialNumbersSelectionItem[] = [] , discountReason: string = '')
    {       
        this.serialNumbers = serialNumbers;
        this.discountReason = discountReason;
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