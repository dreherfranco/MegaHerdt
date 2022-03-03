import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { PurchaseClaim } from 'src/app/models/PurchaseClaim/PurchaseClaim';
import { PurchaseClaimService } from 'src/app/services/purchase-claims/purchase-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogShowPurchaseDetailComponent } from '../../purchases/dialog-show-purchase-detail/dialog-show-purchase-detail.component';

@Component({
  selector: 'app-show-purchase-claims',
  templateUrl: './show-purchase-claims.component.html',
  styleUrls: ['./show-purchase-claims.component.css']
})
export class ShowPurchaseClaimsComponent implements OnInit {
  purchaseClaims: Array<PurchaseClaim>;
  paginate: Paginate;
  
  constructor(private _purchaseClaimService: PurchaseClaimService, 
    private _storageService: StorageService, public dialog: MatDialog) {
    this.purchaseClaims = new Array<PurchaseClaim>();
    this.paginate = new Paginate(1,6);
  }

  ngOnInit(): void {
    this.loadPurchaseClaims();
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
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
