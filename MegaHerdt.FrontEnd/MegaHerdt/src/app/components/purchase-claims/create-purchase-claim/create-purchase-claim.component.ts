import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseClaimCreation } from 'src/app/models/PurchaseClaim/PurchaseClaimCreation';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { PurchaseClaimService } from 'src/app/services/purchase-claims/purchase-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-purchase-claim',
  templateUrl: './create-purchase-claim.component.html',
  styleUrls: ['./create-purchase-claim.component.css']
})
export class CreatePurchaseClaimComponent implements OnInit {
  description: string;

  constructor(private _route: ActivatedRoute, private _purchaseClaimService: PurchaseClaimService,
    private _storageService: StorageService) {
      this.description = '';
   }

  ngOnInit(): void {

  }

  getPurchaseId(): number{
    let id: number = 0;
    this._route.params.subscribe(
      params => {
        id = params['id'];
      }
    );
    return id;
  }

  onSubmit(form:any){
    let identity: UserDetail = this._storageService.getIdentity();
    let purchaseId = this.getPurchaseId();
    let purchaseClaim = new PurchaseClaimCreation(identity.id,purchaseId, this.description, new Date());
    
    this._purchaseClaimService.create(purchaseClaim,this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al guardar el reclamo");

          AlertService.errorAlert('No se pudo efectuar el reclamo');

        }
        else
        {
          console.log("el reclamo se creo correctamente");
          
          AlertService.successAlert('Reclamo efectuado correctamente').then((result) => {
            if (result.isConfirmed) {     
                // Limpia el formulario.           
                form.reset();
            }
          });
        
       
        }
      },
      error: (err) => {
        console.log(err)
        AlertService.errorAlert('No se pudo efectuar el reclamo');
        
      }
    });
  }

}
