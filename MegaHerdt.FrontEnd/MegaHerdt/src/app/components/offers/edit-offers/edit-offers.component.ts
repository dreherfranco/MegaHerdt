import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleOffer } from 'src/app/models/ArticleOffer/ArticleOffer';
import { ArticleService } from 'src/app/services/articles/article.service';
import { OfferService } from 'src/app/services/offers/offer.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogUpdateOfferComponent } from './dialog-update-offer/dialog-update-offer.component';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.component.html',
  styleUrls: ['./edit-offers.component.css'],

})
export class EditOffersComponent implements OnInit {
  offers: Array<ArticleOffer>;
  articles: Array<ArticleName>;
  paginate: Paginate;
  @ViewChild('content', { static: true }) content!: ElementRef;
  sortedData: ArticleOffer[] = [];

  constructor(private _offerService: OfferService, private _storageService: StorageService,
    private _articleService: ArticleService,public dialog: MatDialog) {
    this.offers = new Array<ArticleOffer>();
    this.articles = new Array<ArticleName>();
    this.paginate = new Paginate(1,3);
  }

  ngOnInit(): void {
    this.loadOffers();
    this.loadArticles();
  }

  openDialogUpdate(offer: ArticleOffer){
    AlertService.warningAlert(
      '¿Estas seguro que quiere actualizar esta Oferta?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.updateOffer(offer);
      }
    });
  }

  openDialogDelete(offerId: number){
    AlertService.warningAlert(
      '¿Estas seguro que quiere eliminar esta Oferta?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.deleteOffer(offerId);
      }
    });
  }

  deleteOffer(offerId: number){
    this._offerService.delete(offerId, this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          AlertService.errorAlert('¡Error al intentar eliminar la Oferta!');
        }else{
          this.loadOffers();
          AlertService.successAlert('¡Eliminada!', 'Oferta eliminada correctamente');
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar eliminar la Oferta!');
        console.log(err)
      }
    })
  }

  updateOffer(offer: ArticleOffer){
    this._offerService.update(offer, this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          AlertService.errorAlert('¡Error al intentar actualizar la Oferta!');
        }else{
          AlertService.successAlert('¡Actualizada!','Oferta actualizada correctamente');
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar actualizar la Oferta!');
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
          this.sortedData = this.offers.slice();
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

  generatePDF() {
    PDFGenerator.generatePDF(this.content);
  }

  
  sortData(sort: Sort) {
    const data = this.offers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'discountPercentage':
          return compare(a.discountPercentage, b.discountPercentage, isAsc);
        case 'startDate':
          return compare(a.startDate, b.startDate, isAsc);
        case 'endDate':
          return compare(a.endDate, b.endDate, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string | Date | string[], b: number | string | Date | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
