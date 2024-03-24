export class ArticleProviderUpdate{
    id: number;
    providerId: number;
    provisionDate: Date;
    constructor(id: number, providerId: number, provisionDate: Date)
    {
        this.id = id;
        this.providerId = providerId;
        this.provisionDate = provisionDate;
    }
}