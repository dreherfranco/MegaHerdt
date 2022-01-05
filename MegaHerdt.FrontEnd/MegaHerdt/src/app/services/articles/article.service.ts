import { Injectable } from '@angular/core';
import { Article } from '../../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Article [] = [
    new Article(1, 'Skyrim', 'lorem impsum', 24.69, 'https://images-na.ssl-images-amazon.com/images/I/81VvoP5zRjL._AC_SL1500_.jpg'),
    new Article(2, 'Fallout 4', 'lorem ipsum', 10.17, 'https://images-na.ssl-images-amazon.com/images/I/51xTBvX3GPL._SX385_.jpg'),
    new Article(3, 'Far Cry V', 'lorem ipsum', 47.45, 'https://images-na.ssl-images-amazon.com/images/I/6141LNAe38L._SX385_.jpg'),
    new Article(4, 'TW3', 'lorem ipsum', 32.82, 'https://images-na.ssl-images-amazon.com/images/I/51FdXnfNj6L.jpg'),
    new Article(5, 'DS I/II/III', 'lorem ipsum', 47.45, 'https://images-na.ssl-images-amazon.com/images/I/81glc-5ahSL._SL1500_.jpg'),
    new Article(6, 'RDR II', 'lorem ipsum', 32.82, 'https://images-na.ssl-images-amazon.com/images/I/81zYK3DIv9L._SL1500_.jpg')
  ];

  constructor() { }

  getProducts(): Article[] {
    return this.articles;
  }
}
