export class ArticleOfferDetail{
    id: number;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;

    constructor(id: number, discountPercentage:number, startDate:Date, endDate:Date) 
    {
        this.id = id;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}