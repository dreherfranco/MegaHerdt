import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../services/articles/article.service';
import { Article } from '../../../models/Article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.articles = this.articleService.getProducts();
  }

}
