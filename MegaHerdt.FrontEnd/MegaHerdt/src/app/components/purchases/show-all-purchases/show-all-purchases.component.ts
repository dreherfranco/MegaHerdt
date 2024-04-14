import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Purchase, PurchaseState } from 'src/app/models/Purchase/Purchase';
import { PurchaseArticleSerialNumber } from 'src/app/models/PurchaseArticleSerialNumber/PurchaseArticleSerialNumber';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogShowSerialNumbersComponent } from '../../articles-provisions/dialog-show-serial-numbers/dialog-show-serial-numbers.component';
import { MatDialog } from '@angular/material/dialog';
import { isNumber } from 'lodash';
import { ReservedStateDialogComponent } from './dialogs/reserved-state-dialog/reserved-state-dialog.component';

@Component({
  selector: 'app-show-all-purchases',
  templateUrl: './show-all-purchases.component.html',
  styleUrls: ['./show-all-purchases.component.css']
})
export class ShowAllPurchasesComponent implements OnInit {
  purchases: Purchase[] = [];
  paginate: Paginate;
  purchaseStatesEnum = PurchaseState;
  purchaseStateSelected: number = PurchaseState.Reserved;

  constructor(private _purchaseService: PurchaseService, 
    private _storageService: StorageService,
    private _router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.paginate = new Paginate(1,6);
   }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const state = params['state']; // Aquí obtienes el valor del parámetro 'status'
      
      if(state !== null && state !== undefined && isNumber(state)){
        // Seteo el estado actual seleccionado
        this.purchaseStateSelected = state;
      }

    });

    
    this.loadAllPurchases();
  }

  loadAllPurchases(){
    console.log(this.purchaseStateSelected);
    this._purchaseService.getByState(this.purchaseStateSelected, this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        this.purchases = result;

        // Si no hay compras con envios entonces redirige al inicio.
        if(this.purchases.length === 0){
         AlertService.warningAlertAdvice("¡No existen compras disponibles!");
        //  .then((result) => {
        //     this._router.navigate(['/']);
        //  });
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

  getPurchaseStateName(state: number): string {
     return Purchase.getPurchaseStateName(state);
  }

  onPurchaseStateChange() {
   this.reloadPage();
  }

  reloadPage(){
    // Navegar a la URL con el estado seleccionado
    this._router.navigate(['/administrate/administrate-purchases-shipments', this.purchaseStateSelected]);
    this.loadAllPurchases();
  }

  openUpdateDialog(purchase: Purchase){
    if(this.purchaseStateSelected == this.purchaseStatesEnum.Reserved)
    {
      this.openReservedDialog(purchase);
    }
    else if(this.purchaseStateSelected == this.purchaseStatesEnum.Paid)
    {
      this.openPaidDialog(purchase);
    }
  }

  openReservedDialog(purchase: Purchase){
    const dialogRef = this.dialog.open(ReservedStateDialogComponent,
      {
        disableClose:true,
        data: purchase,
        maxHeight: '90vh'
      });

    dialogRef.afterClosed().subscribe((result: Purchase) => {
      if(result != undefined){
        // EJECUTAR UPDATE PARA PASAR DE ESTADO
         this.fromReservedToPaid(result);
      }else{
        // VER SI CARGO LAS COMPRAS O NO
        this.reloadPage();
      }
    });
  }

  /**
   * Pasar del estado Reserved al estado Paid
   */
  fromReservedToPaid(purchase: Purchase){
    this._purchaseService.fromReservedToPaid(purchase, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar actualizar esta venta!');
        } else {
          
          AlertService.successAlert('¡Actualizada!','Actualización concretada correctamente')
          .then((result) => {
            // Seteo el proximo estado para que se refresque la grilla de compras.
            this.purchaseStateSelected = PurchaseState.Paid;
            this.reloadPage();
          });
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar actualizar esta venta!');
        console.log(err)
      }
    })
  }


  openPaidDialog(purchase: Purchase){
    AlertService.warningAlert('¿Seguro que quieres actualizar esta venta como \'Entregada\'?')
    .then((result) => {
      if (result.isConfirmed) {     
          this.fromPaidToDelivered(purchase);
      }
      else{
        this.reloadPage();
      }
    });
   
  }

  /**
   * Pasar del estado Paid al estado Delivered
   * @param purchase 
   */
  fromPaidToDelivered(purchase: Purchase){
    this._purchaseService.fromPaidToDelivered(purchase, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar actualizar esta venta!');
        } else {
          
          AlertService.successAlert('¡Actualizada!','Actualización concretada correctamente')
          .then((result) => {
            // Seteo el proximo estado para que se refresque la grilla de compras.
            this.purchaseStateSelected = PurchaseState.Delivered;
            this.reloadPage();
          });
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar actualizar esta venta!');
        console.log(err)
      }
    })
  }

  /**
   * Obtiene el monto total (tengo que obtenerlo del backend, es un punto a mejorar)
   * @param purchase 
   * @returns 
   */
  getTotal(purchase: Purchase){
    var total = 0;
    purchase.purchasesArticles.forEach((pa) => {
      total += pa.articleQuantity * pa.articlePriceAtTheMoment;
    });
    return total;
  }
}
