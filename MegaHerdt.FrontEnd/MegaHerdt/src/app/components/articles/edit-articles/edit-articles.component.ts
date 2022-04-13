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
  filterByStock: boolean = false;

  constructor(private _articleService: ArticleService) 
  { 
    this.paginate = new Paginate(1,5);
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

  filter(){
    if(!this.filterByStock){
      this.articles = this.articles.filter(x => x.stock > 0);
    }else{
      this.loadProducts();
    }
  }

}
