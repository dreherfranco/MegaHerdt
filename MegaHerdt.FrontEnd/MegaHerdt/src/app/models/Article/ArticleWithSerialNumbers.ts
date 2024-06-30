import { Article } from './Article';

export class ArticleWithSerialNumbers {
    article: Article;
    serialNumbers: string[] = [];
    discountReason: string;
    quantityToDiscount: number | null;

    constructor(article: Article = new Article(), serialNumbers: string[] = [], discountReason: string = '', quantityToDiscount:number | null = null) 
    {       
        this.article = article;
        this.serialNumbers = serialNumbers;
        this.discountReason = discountReason;
        this.quantityToDiscount = quantityToDiscount;
    }
}

/**
 * Modelo para seleccionar items con checkbox
 */
export class SerialNumbersSelection {
    serialNumbers: SerialNumbersSelectionItem[];
    discountReason: string;
    quantityToDiscount: number | null;

    constructor(serialNumbers: SerialNumbersSelectionItem[] = [] , discountReason: string = '', quantityToDiscount:number | null = null)
    {       
        this.serialNumbers = serialNumbers;
        this.discountReason = discountReason;
        this.quantityToDiscount = quantityToDiscount;
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