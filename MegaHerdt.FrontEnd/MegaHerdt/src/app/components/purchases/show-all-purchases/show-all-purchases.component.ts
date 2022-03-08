import { Component, OnInit } from '@angular/core';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-show-all-purchases',
  templateUrl: './show-all-purchases.component.html',
  styleUrls: ['./show-all-purchases.component.css']
})
export class ShowAllPurchasesComponent implements OnInit {
  purchases: Purchase[] = [];
  paginate: Paginate;

  constructor(private _purchaseService: PurchaseService, private _storageService: StorageService) {
    this.paginate = new Paginate(1,6);
   }

  ngOnInit(): void {
    this.loadAllPurchases();
  }

  loadAllPurchases(){
    this._purchaseService.getAll(this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        this.purchases = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
