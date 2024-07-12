import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleOffer } from 'src/app/models/ArticleOffer/ArticleOffer';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ArticleService } from 'src/app/services/articles/article.service';
import { OfferService } from 'src/app/services/offers/offer.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-offers-form',
  templateUrl: './offers-form.component.html',
  styleUrls: ['./offers-form.component.css']
})
export class OffersFormComponent implements OnInit {
  offer: ArticleOffer;
  articles: Array<ArticleName>;

  constructor( @Optional() public dialogRef: MatDialogRef<OffersFormComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: ArticleOffer, 
              private _articleService: ArticleService, 
              private _offerService: OfferService,
              private _storageService: StorageService) 
  { 
    this.offer = new ArticleOffer();
    this.articles = new Array<ArticleName>();
  }

  ngOnInit(): void {
    this.loadArticles();
    if(this.dialogRef)
    {
      this.offer = { ...this.data };
    }
  }

  confirm(){
    if(this.dialogRef)
    {
      // Caso Update, se usa como dialogo
      this.dialogRef.close(this.offer);
    }
    // Caso de Creación
    else
    {
      this.onCreate();
    }
  }

  closeModal(){
    this.dialogRef.close();
  }

  onCreate(form:any = undefined){
    
    this._offerService.create(this.offer, this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          AlertService.errorAlert('¡Error al intentar crear la Oferta!');
        }else{
          AlertService.successAlert('¡Oferta creada correctamente!').then((result) => {
            if (result.isConfirmed) {     
              // Recarga la pagina
                window.location.reload();
            }
          });
        }

      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar crear la Oferta!');
        console.log(err)
      }
    });
  }

  loadArticles(){
    this._articleService.getArticleNamesWithStock().subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al obtener articulos");
        }else{
          this.articles = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
