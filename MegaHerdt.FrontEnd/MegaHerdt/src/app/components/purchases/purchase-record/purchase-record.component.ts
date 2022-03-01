import { Component, OnInit } from '@angular/core';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-purchase-record',
  templateUrl: './purchase-record.component.html',
  styleUrls: ['./purchase-record.component.css']
})
export class PurchaseRecordComponent implements OnInit {
  purchases: Purchase[] = [];
  paginate: Paginate;

  constructor(private _purchaseService: PurchaseService, private _storageService: StorageService) {
    this.paginate = new Paginate(1,6);
   }

  ngOnInit(): void {
    this.loadClientPurchases();
  }

  loadClientPurchases(){
    var identity: UserDetail = this._storageService.getIdentity();
    this._purchaseService.getClientPurchases(identity.id, this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        this.purchases = result;
        console.log(result)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
