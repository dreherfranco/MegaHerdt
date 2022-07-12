import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseClaimAnswerCreation } from 'src/app/models/PurchaseClaim/PurchaseClaimAnswerCreation';
import { PurchaseClaimService } from 'src/app/services/purchase-claims/purchase-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-answer-purchase-claims',
  templateUrl: './answer-purchase-claims.component.html',
  styleUrls: ['./answer-purchase-claims.component.css']
})
export class AnswerPurchaseClaimsComponent implements OnInit {
  answer: string;
  statusSubmit: string;

  constructor(private _route: ActivatedRoute, private _purchaseClaimService: PurchaseClaimService,
    private _storageService: StorageService) {
    this.answer = '';
    this.statusSubmit = '';
   }

  ngOnInit(): void {

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
          this.statusSubmit = "failed";
        }else{
          this.statusSubmit = "success";
          form.reset();
        }
      },
      error: (err) => {
        this.statusSubmit = "failed";
        console.log(err)
      }
    });
  }

}
