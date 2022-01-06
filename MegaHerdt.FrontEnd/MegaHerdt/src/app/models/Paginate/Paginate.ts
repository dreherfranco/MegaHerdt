export class Paginate {
    page: number;
    recordsPerPage: number;

    constructor(page: number, recordsPerPage: number) {
        this.page = page;
        this.recordsPerPage = recordsPerPage;
    }
}