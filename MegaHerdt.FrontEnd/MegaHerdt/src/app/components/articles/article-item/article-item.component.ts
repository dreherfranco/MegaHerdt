import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { 
    this.article = this.instanceArticle() ;
  }

  ngOnInit(): void {
  }

  private instanceArticle(): Article {
    let brand = new Brand (0,'');
    let category = new Category (0,'');
    let offers = new Array<ArticleOfferDetail>();
    let article = new Article(0,'','','',0,0,brand,category,offers, offers);
    return article;
  }

  isOnOffer(article: Article):boolean{
    return article.unitValueWithOffer < article.unitValue;
  }
}
