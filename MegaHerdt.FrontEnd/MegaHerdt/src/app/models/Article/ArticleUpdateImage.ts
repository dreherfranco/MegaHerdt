export class ArticleUpdateImage {
    id: number;
    image: File;
    constructor(id: number, image: File){
        this.id=id;
        this.image=image;
    }
}