import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseClaimAnswerCreation } from 'src/app/models/PurchaseClaim/PurchaseClaimAnswerCreation';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { PurchaseClaimService } from 'src/app/services/purchase-claims/purchase-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-answer-purchase-claims',
  templateUrl: './answer-purchase-claims.component.html',
  styleUrls: ['./answer-purchase-claims.component.css']
})
export class AnswerPurchaseClaimsComponent implements OnInit {
  answer: string;

  constructor(private _route: ActivatedRoute, 
    private _router: Router, 
    private _purchaseClaimService: PurchaseClaimService,
    private _storageService: StorageService,
    private location: Location) 
  {
    this.answer = '';
  }

  ngOnInit(): void {

  }

  goBack() {
    this.location.back();
  }

  getIdPurchaseClaim(): number{
    let id: number = 0;
    this._route.params.subscribe(
      params => {
        id = params['idPurchaseClaim'];
      }
    );
    return id;
  }

  onSubmit(form: any){
    var identity = this._storageService.getIdentity();
    var idPurchaseClaim = this.getIdPurchaseClaim();
    var purchaseClaimAnswer = new PurchaseClaimAnswerCreation(idPurchaseClaim, this.answer, identity.userName);
   
    this._purchaseClaimService.answerClaim(purchaseClaimAnswer,this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          AlertService.errorAlert('¡Error al intentar crear la respuesta de Reclamo!');
        }else{
          AlertService.successAlert('¡Respuesta de Reclamo efectuada correctamente!').then((result) => {
            if (result.isConfirmed) {     
              this._router.navigate(['/administrate/show-purchase-claims']);
            }
          });

        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar crear la respuesta de Reclamo!');
        console.log(err)
      }
    });
  }

}
