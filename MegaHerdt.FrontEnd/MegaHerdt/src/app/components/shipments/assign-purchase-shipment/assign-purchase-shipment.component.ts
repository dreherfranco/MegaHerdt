import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { TransportCompany } from 'src/app/models/TransportCompany/TransportCompany';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TransportCompanyService } from 'src/app/services/transport-companies/transport-company.service';

@Component({
  selector: 'app-assign-purchase-shipment',
  templateUrl: './assign-purchase-shipment.component.html',
  styleUrls: ['./assign-purchase-shipment.component.css']
})
export class AssignPurchaseShipmentComponent implements OnInit {
  purchase: Purchase = new Purchase();
  transportCompanies: TransportCompany[] = [];
  statusSubmit: string = '';

  constructor(private _route: ActivatedRoute,
    private _purchaseService: PurchaseService, 
    private _storageService: StorageService, 
    private _transportCompanyService: TransportCompanyService,
    private _router: Router) {
   }

  ngOnInit(): void {
    this.loadPurchase();
    this.loadTransportCompanies();
  }

  getPurchaseId(): number{
    let id: number = 0;
    this._route.params.subscribe(
      params => {
        id = params['purchaseId'];
      }
    );
    return id;
  }

  loadPurchase(){
    var purchaseId = this.getPurchaseId();
    this._purchaseService.getPurchaseById(purchaseId, this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        this.purchase = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadTransportCompanies(){
    this._transportCompanyService.getAll().subscribe({
      next: (result) =>{
        this.transportCompanies = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit(form: any){
    console.log(this.purchase.shipment)
    this._purchaseService.assignShipment(this.purchase.shipment, this._storageService.getTokenValue()).subscribe({
      next: (result) => {
        console.log(result)
        if(!result.error){
          AlertService.successAlert('¡Envio asignado correctamente!').then((result) => {
            if (result.isConfirmed) {     
              this._router.navigate(['/administrate/administrate-purchases-shipments']);
            }
          });
        }else{
          AlertService.errorAlert('¡Error al intentar asignar el Envio a la compra!');
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar asignar el Envio a la compra!');
        console.log(err);
      }
    });
  }
}
