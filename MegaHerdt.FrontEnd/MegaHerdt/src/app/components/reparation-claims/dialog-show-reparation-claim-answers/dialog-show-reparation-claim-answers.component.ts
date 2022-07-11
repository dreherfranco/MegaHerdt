import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReparationClaimAnswer } from 'src/app/models/ReparationClaims/ReparationClaimAnswer';
import { ReparationClaimService } from 'src/app/services/reparation-claims/reparation-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-dialog-show-reparation-claim-answers',
  templateUrl: './dialog-show-reparation-claim-answers.component.html',
  styleUrls: ['./dialog-show-reparation-claim-answers.component.css']
})
export class DialogShowReparationClaimAnswersComponent implements OnInit {
  reparationClaimAnswers: ReparationClaimAnswer[] = [];
  constructor(public dialogRef: MatDialogRef<DialogShowReparationClaimAnswersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number, 
    private _reparationClaimService: ReparationClaimService,
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
    this._reparationClaimService.getAnswersByClaimId(this.data, this._storageService.getTokenValue()).subscribe({
      next: (res) =>{
        if(!res.error){
          this.reparationClaimAnswers = res;
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
