import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchaseClaimAnswer } from 'src/app/models/PurchaseClaim/PurchaseClaimAnswer';
import { PurchaseClaimService } from 'src/app/services/purchase-claims/purchase-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-dialog-show-purchase-claim-answers',
  templateUrl: './dialog-show-purchase-claim-answers.component.html',
  styleUrls: ['./dialog-show-purchase-claim-answers.component.css']
})
export class DialogShowPurchaseClaimAnswersComponent implements OnInit {
  purchaseClaimAnswers: PurchaseClaimAnswer[] = [];
  constructor(public dialogRef: MatDialogRef<DialogShowPurchaseClaimAnswersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number, 
    private _purchaseClaimService: PurchaseClaimService,
    private _storageService: StorageService) { 
      this.dialogRef.disableClose = false;
    }

  ngOnInit(): void {
    this.loadClaimAnswers();
  }

  closeModal(){
    this.dialogRef.close();
  }

  loadClaimAnswers(){
    this._purchaseClaimService.getAnswersByClaimId(this.data, this._storageService.getTokenValue()).subscribe({
      next: (res) =>{
        if(!res.error){
          this.purchaseClaimAnswers = res;
          console.log(res);
        }else{
          console.log(res.error);
        }
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }
}
