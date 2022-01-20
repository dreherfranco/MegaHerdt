import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../services/articles/article.service';
import { Article } from '../../../models/Article/Article';
import { Paginate } from '../../../models/Paginate/Paginate';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  paginate: Paginate;
  searchText: string;
  
  constructor(private _articleService: ArticleService) 
  { 
    this.paginate = new Paginate(1,6);
    this.searchText = "";
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this._articleService.getArticles().subscribe(
      {
        next: (response) => this.articles = response,
        error: (err) => console.log(err)
      }
    );
  }

}
