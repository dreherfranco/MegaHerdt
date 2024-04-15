export class ArticleProviderSerialNumber{
    id: number;
    serialNumber: string;
    constructor(serialNumber: string = ''){
        this.id = 0;
        this.serialNumber = serialNumber;
    }
}