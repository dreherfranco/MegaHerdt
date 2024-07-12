import { Component, OnInit, Input} from '@angular/core';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { CartService } from 'src/app/services/cart/cart.service';
import { Article } from '../../../models/Article/Article';
import { Brand } from '../../../models/ArticleBrand/Brand';
import { Category } from '../../../models/ArticleCategory/Category';
import { ArticleOfferDetail } from '../../../models/ArticleOffer/ArticleOfferDetail';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  @Input() article: Article;

  constructor(private _cartService: CartService) { 
    this.article = new Article();
  }

  isOnOffer(article: Article): boolean{
    return article.unitValueWithOffer < article.unitValue;
  }

  addToCart(){
    var purchaseArticle = new PurchaseArticleCreation(this.article.id, 1, this.article.unitValueWithOffer, this.article.name);
    this._cartService.addToCart(this.article, purchaseArticle);
  }

  formatoArgentino(precio: number): string {
    return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }

  getStyle(){
    return{
      color: (this.article.stock>20) ? '#00A02F' :
              (this.article.stock>5)  ? '#BE8C08' : 'red',
      display: (this.article.stock<1) ? "none" : "block",
    }
  }

  ngOnInit(): void {}
}
