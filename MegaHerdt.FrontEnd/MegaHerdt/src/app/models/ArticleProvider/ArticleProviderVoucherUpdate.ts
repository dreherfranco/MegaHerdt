export class ArticleProviderVoucherUpdate{
    id: number;
    voucher: File;
    constructor(id: number, voucher: File){
        this.id = id;
        this.voucher = voucher;
    }
}