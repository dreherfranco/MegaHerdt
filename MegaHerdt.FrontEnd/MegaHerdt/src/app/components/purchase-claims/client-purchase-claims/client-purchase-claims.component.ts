import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { PurchaseClaim } from 'src/app/models/PurchaseClaim/PurchaseClaim';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { PurchaseClaimService } from 'src/app/services/purchase-claims/purchase-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogShowPurchaseDetailComponent } from '../../purchases/dialog-show-purchase-detail/dialog-show-purchase-detail.component';
import { DialogShowPurchaseClaimAnswersComponent } from '../dialog-show-purchase-claim-answers/dialog-show-purchase-claim-answers.component';
import { Sort } from '@angular/material/sort';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';

@Component({
  selector: 'app-client-purchase-claims',
  templateUrl: './client-purchase-claims.component.html',
  styleUrls: ['./client-purchase-claims.component.css']
})
export class ClientPurchaseClaimsComponent implements OnInit {
  purchasesClaims: Array<PurchaseClaim>;
  paginate: Paginate;
  sortedData: PurchaseClaim[] = [];
  @ViewChild('content', { static: true }) content!: ElementRef;
  searchText: string = '';
  
  constructor(private _purchaseClaimService: PurchaseClaimService, 
    private _storageService: StorageService, public dialog: MatDialog) {
    this.purchasesClaims = new Array<PurchaseClaim>();
    this.paginate = new Paginate(1,6);
   }

  ngOnInit(): void {
    this.loadPurchasesClaims();
  }

  openDialog(purchase: Purchase){
    this.dialog.open(DialogShowPurchaseDetailComponent,
      {
        disableClose:true,
        data: purchase
      });
  }

  loadPurchasesClaims(){
    let identity: UserDetail = this._storageService.getIdentity();
    
    this._purchaseClaimService.getByClientId(identity.id, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los reclamos");
        } else {
          this.purchasesClaims = response;
          this.sortedData = this.purchasesClaims.slice();
          console.log(response)
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  openDialogClaimAnswers(reparationClaimId: number){
    this.dialog.open(DialogShowPurchaseClaimAnswersComponent,
      {
        disableClose:true,
        data: reparationClaimId
      });
  }
  
  generatePDF() {
    PDFGenerator.generatePDF(this.content);
  }
  
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }
  
  sortData(sort: Sort) {
    const data = this.purchasesClaims.slice();
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
