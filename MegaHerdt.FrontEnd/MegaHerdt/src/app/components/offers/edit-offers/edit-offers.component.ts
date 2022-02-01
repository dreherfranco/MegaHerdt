import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleOffer } from 'src/app/models/ArticleOffer/ArticleOffer';
import { ArticleService } from 'src/app/services/articles/article.service';
import { OfferService } from 'src/app/services/offers/offer.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogUpdateOfferComponent } from './dialog-update-offer/dialog-update-offer.component';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.component.html',
  styleUrls: ['./edit-offers.component.css'],

})
export class EditOffersComponent implements OnInit {
  offers: Array<ArticleOffer>;
  articles: Array<ArticleName>;
  statusSubmit: string;

  constructor(private _offerService: OfferService, private _storageService: StorageService,
    private _articleService: ArticleService,public dialog: MatDialog) {
    this.offers = new Array<ArticleOffer>();
    this.articles = new Array<ArticleName>();
    this.statusSubmit = "";
  }

  ngOnInit(): void {
    this.loadOffers();
    this.loadArticles();
  }

  openDialog(offer: ArticleOffer){
    const dialogRef = this.dialog.open(DialogUpdateOfferComponent,
      {
        disableClose:true,
        data: offer
      });

    dialogRef.afterClosed().subscribe((result: ArticleOffer) => {
      if(result != undefined){
        this.updateOffer(result);
      }
    });
  }

  deleteOffer(offerId: number){
    this._offerService.delete(offerId, this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al eliminar oferta");
        }else{
          this.loadOffers();
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateOffer(offer: ArticleOffer){
    this._offerService.update(offer, this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al actualizar oferta");
          this.statusSubmit = "failed";
        }else{
          this.statusSubmit = "success";
        }
      },
      error: (err) => {
        this.statusSubmit = "failed";
        console.log(err)
      }
    })
  }

  loadOffers() {
    this._offerService.getAll(this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al cargar ofertas");
        }else{
          this.offers = response;
        }
      },
      error: (err) => {
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