import { Component, OnInit, Input } from '@angular/core';
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
    this.article = this.instanceArticle();
  }

  ngOnInit(): void {
    console.log(this._cartService.getCart())
    console.log(this._cartService.getCart())
  }

  private instanceArticle(): Article {
    let brand = new Brand (0,'');
    let category = new Category (0,'');
    let offers = new Array<ArticleOfferDetail>();
    let article = new Article(0,'','',0,'',0,0,brand,category,offers, offers);
    return article;
  }

  isOnOffer(article: Article):boolean{
    return article.unitValueWithOffer < article.unitValue;
  }

  addToCart(){
    var purchaseArticle = new PurchaseArticleCreation(this.article.id, 1, this.article.unitValueWithOffer);
    this._cartService.AddToCart(this.article, purchaseArticle);
  }
}
