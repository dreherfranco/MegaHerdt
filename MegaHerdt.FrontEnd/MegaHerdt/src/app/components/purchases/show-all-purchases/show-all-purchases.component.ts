import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Purchase, PurchaseState } from 'src/app/models/Purchase/Purchase';
import { PurchaseArticleSerialNumber } from 'src/app/models/PurchaseArticleSerialNumber/PurchaseArticleSerialNumber';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogShowSerialNumbersComponent } from '../../articles-provisions/dialog-show-serial-numbers/dialog-show-serial-numbers.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-all-purchases',
  templateUrl: './show-all-purchases.component.html',
  styleUrls: ['./show-all-purchases.component.css']
})
export class ShowAllPurchasesComponent implements OnInit {
  purchases: Purchase[] = [];
  paginate: Paginate;

  constructor(private _purchaseService: PurchaseService, 
    private _storageService: StorageService,
    private _router: Router,
    public dialog: MatDialog) {
    this.paginate = new Paginate(1,6);
   }

  ngOnInit(): void {
    this.loadAllPurchases();
  }

  loadAllPurchases(){
    this._purchaseService.getAll(this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        this.purchases = result;

        // Si no hay compras con envios entonces redirige al inicio.
        if(this.purchases.length === 0){
         AlertService.warningAlertAdvice("¡No existen compras con envios a asignar!")
         .then((result) => {
            this._router.navigate(['/']);
         });
        }

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showSerialNumbers(serialNumbers: PurchaseArticleSerialNumber[]){     
    const dialogRef = this.dialog.open(DialogShowSerialNumbersComponent,
      {
        data: serialNumbers,
        height: '300px',
        width: '300px'
      });

    dialogRef.afterClosed().subscribe((result: any) => {
      /**logica para aplicar luego de cerrar el dialogo */
    });
  }

  getPurchaseState(state: number): string {
     return Purchase.getPurchaseStateName(state);
  }
}
