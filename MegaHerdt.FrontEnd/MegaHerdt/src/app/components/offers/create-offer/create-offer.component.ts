import { Component, OnInit } from '@angular/core';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleOfferCreation } from 'src/app/models/ArticleOffer/ArticleOfferCreation';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ArticleService } from 'src/app/services/articles/article.service';
import { OfferService } from 'src/app/services/offers/offer.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  offer: ArticleOfferCreation;
  articles: Array<ArticleName>;

  constructor(private _articleService: ArticleService, private _offerService: OfferService,
    private _storageService: StorageService) { 
    this.offer = new ArticleOfferCreation(0,new Date(), new Date(),0);
    this.articles = new Array<ArticleName>();
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  onSubmit(form:any){
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
    this._articleService.getArticleNames().subscribe({
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
