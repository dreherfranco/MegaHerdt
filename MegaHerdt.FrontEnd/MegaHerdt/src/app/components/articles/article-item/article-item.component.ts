import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { CartService } from 'src/app/services/cart/cart.service';
import { Article } from '../../../models/Article/Article';
import { Brand } from '../../../models/ArticleBrand/Brand';
import { Category } from '../../../models/ArticleCategory/Category';
import { ArticleOfferDetail } from '../../../models/ArticleOffer/ArticleOfferDetail';
import { color } from 'html2canvas/dist/types/css/types/color';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  @Input() article: Article;

  constructor(private _cartService: CartService) { 
    this.article = this.instanceArticle();
  }

  ngOnInit(): void {
  }

  private instanceArticle(): Article {
    let brand = new Brand (0,'');
    let category = new Category (0,'');
    let offers = new Array<ArticleOfferDetail>();
    let article = new Article(0,'','',0,'',0,0,brand,category,offers, offers);
    return article;
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
}
