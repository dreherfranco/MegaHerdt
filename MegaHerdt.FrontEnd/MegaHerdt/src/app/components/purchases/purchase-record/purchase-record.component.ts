import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
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
  sortedData: Purchase[] = [];

  constructor(private _purchaseService: PurchaseService, private _storageService: StorageService) {
    this.paginate = new Paginate(1,4);
   }

  ngOnInit(): void {
    this.loadClientPurchases();
  }

  loadClientPurchases(){
    var identity: UserDetail = this._storageService.getIdentity();
    this._purchaseService.getClientPurchases(identity.id, this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        console.log(result)
        this.purchases = result;
        this.sortedData = this.purchases.slice();

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.purchases.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return compare(a.date, b.date, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | boolean | string | Date | string[], b: number | boolean | string | Date | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}