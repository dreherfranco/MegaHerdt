import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { PurchaseClaim } from 'src/app/models/PurchaseClaim/PurchaseClaim';
import { PurchaseClaimService } from 'src/app/services/purchase-claims/purchase-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogShowPurchaseDetailComponent } from '../../purchases/dialog-show-purchase-detail/dialog-show-purchase-detail.component';
import { Sort } from '@angular/material/sort';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-show-purchase-claims',
  templateUrl: './show-purchase-claims.component.html',
  styleUrls: ['./show-purchase-claims.component.css']
})
export class ShowPurchaseClaimsComponent implements OnInit {
  purchaseClaims: Array<PurchaseClaim>;
  @ViewChild('content', { static: true }) content!: ElementRef;
  paginate: Paginate;
  sortedData: PurchaseClaim[] = [];
  searchText: string = '';
  
  constructor(private _purchaseClaimService: PurchaseClaimService, 
    private _storageService: StorageService, public dialog: MatDialog) {
    this.purchaseClaims = new Array<PurchaseClaim>();
    this.paginate = new Paginate(1,6);
  }

  ngOnInit(): void {
    this.loadPurchaseClaims();
  }
  
  showDescriptionDialog(description: string)
  {
    AlertService.infoDialog(
      'Descripción del reclamo',
      '<p>' + description + '</p>',
      'Cerrar'
    ).then((result) => {
      if (result.isConfirmed) {
        console.log('El diálogo se ha cerrado.');
      }
    });
  }
  
  openDialog(purchase: Purchase){
    this.dialog.open(DialogShowPurchaseDetailComponent,
      {
        disableClose:true,
        data: purchase
      });
  }

  loadPurchaseClaims(){
    this._purchaseClaimService.getAll(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los reclamos");
        } else {
          this.purchaseClaims = response;
          this.sortedData = this.purchaseClaims.slice();
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
  
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }
  
  sortData(sort: Sort) {
    const data = this.purchaseClaims.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'answered':
            return compare(a.answered, b.answered, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | boolean | string | Date | string[], b: number | boolean | string | Date | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
