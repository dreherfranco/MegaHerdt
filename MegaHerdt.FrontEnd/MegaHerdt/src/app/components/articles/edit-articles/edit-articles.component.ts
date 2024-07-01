import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/models/Article/Article';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ArticleService } from 'src/app/services/articles/article.service';
import { DialogUpdatePriceArticleByCategoryComponent } from './dialog-update-price-article-by-category/dialog-update-price-article-by-category.component';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { StorageService } from 'src/app/services/storage/storage.service';
import { changeImage } from 'src/app/utils/errorImage';
import { DiscountStockComponent } from './discount-stock/discount-stock.component';
import { ArticleWithSerialNumbers } from 'src/app/models/Article/ArticleWithSerialNumbers';

@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.css']
})
export class EditArticlesComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: ElementRef;
  articles: Article[] = [];
  articlesAux: Article[] = [];
  paginate: Paginate;
  searchText: string;
  filterByStock: boolean = false; 
  selectedArticle!: Article;
  isShow:boolean = false;
  changeImage = changeImage;

  constructor(private _articleService: ArticleService, public dialog: MatDialog,
    private _storageService: StorageService,) 
  { 
    this.paginate = new Paginate(1,6);
    this.searchText = "";
    this.selectedArticle = new Article();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Si se cerro la modal
  isDismiss(){
    this.isShow = false;
  }

  openDialogDelete(article: Article) {
    AlertService.warningAlert(`${(article.name).toUpperCase()} se eliminará. \n¿Estas seguro?`, "¡No podrás revertir esto!")
    .then((result) => {
      if (result.isConfirmed) {
        this.onDelete(article);
      }
    })
  }

  openModal(article:Article){
    this.isShow = true;
    this.selectedArticle = article;
  }

  onDelete(article: Article) {
    this._articleService.delete(article.id, this._storageService.getTokenValue())
      .subscribe({
        next: (response) => {
          if (response.error) {

            AlertService.errorAlert('Error al querer eliminar el artículo!')

          } else {
            //window.location.reload();
            AlertService.successAlert('¡Eliminado!',"El articulo ha sido eliminado.")
            .then(()=>
            {
              // Si fue exitoso se recarga la pagina
              // window.location.reload();
              this.articles = this.articles.filter(el => el.id != article.id )
            })
          }
        },
        error: (err) => {
          AlertService.errorAlert('Error al querer eliminar el artículo!')         
          console.log(err.error());
        },
      });
  }

  filter(isInit:boolean){
    
    if(isInit) // Si es el primero no verifico.
      this.articles = this.articles.filter((art:Article) => art.stock > 0);
    else{
      this.articles = this.articlesAux;

      this.articles = this.articles.filter((art:Article) => 
        (this.filterByStock) ? (art.stock > 0) : (art.stock == 0)
      );
    }
  }

  loadProducts(){
    this._articleService.getAllEnableds().subscribe(
      {
        next: (response) => {
          this.articles = response;
          this.articlesAux = this.articles;
          this.filter(true);
          console.log(this.articlesAux)
        },
        error: (err) => console.log(err),
      }
    );
  }

  openDialogUpdatePriceByCategory(){
    const dialogRef = this.dialog.open(DialogUpdatePriceArticleByCategoryComponent,
      {
        disableClose:true,
        height: '320px',
        width: '500px'
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadProducts();
      });
  }


  openDialogDiscountStock(article: Article) 
  {
    const dialogRef = this.dialog.open(DiscountStockComponent,
      {
        data: article,
        height: '47%',
        width: '48%'
      });

    dialogRef.afterClosed().subscribe((result: ArticleWithSerialNumbers) => {
      if(result != undefined){
        this.discountStock(result);
      }
    });
  }

  discountStock(articleWithSerialNumbers: ArticleWithSerialNumbers) {
    this._articleService.ArticleDiscountStock(articleWithSerialNumbers, this._storageService.getTokenValue())
      .subscribe({
        next: (response) => {
          if (response.error) {

            AlertService.errorAlert('¡Error al querer descontar el stock!')

          } else {
            //window.location.reload();
            AlertService.successAlert('¡Stock Descontado!',"El stock se descontó exitosamente.")
            .then(()=>
            {
              // Si fue exitoso se recarga la pagina
               window.location.reload();
            })
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al querer descontar el stock!')         
          console.log(err.error);
        },
      });
  }

}