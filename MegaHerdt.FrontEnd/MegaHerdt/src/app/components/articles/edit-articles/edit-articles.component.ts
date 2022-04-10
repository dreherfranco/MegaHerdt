import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article/Article';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.css']
})
export class EditArticlesComponent implements OnInit {
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
