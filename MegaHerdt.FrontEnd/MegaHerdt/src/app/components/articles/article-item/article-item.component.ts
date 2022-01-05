import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/Article';
@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() article: Article;

  constructor() { 
    this.article = new Article(0,'','',0,'');
  }

  ngOnInit(): void {
  }

}
