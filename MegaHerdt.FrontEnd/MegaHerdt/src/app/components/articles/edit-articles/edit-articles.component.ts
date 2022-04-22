import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/models/Article/Article';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ArticleService } from 'src/app/services/articles/article.service';
import { DialogUpdatePriceArticleByCategoryComponent } from './dialog-update-price-article-by-category/dialog-update-price-article-by-category.component';

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

  constructor(private _articleService: ArticleService, public dialog: MatDialog) 
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

  openDialogUpdatePriceByCategory(){
    const dialogRef = this.dialog.open(DialogUpdatePriceArticleByCategoryComponent,
      {
        disableClose:true,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadProducts();
      });
  }

}
