import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReparationClaimAnswer } from 'src/app/models/ReparationClaims/ReparationClaimAnswer';
import { ReparationClaimService } from 'src/app/services/reparation-claims/reparation-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-answer-reparation-claim',
  templateUrl: './answer-reparation-claim.component.html',
  styleUrls: ['./answer-reparation-claim.component.css']
})
export class AnswerReparationClaimComponent implements OnInit {
  answer: string;
  statusSubmit: string;

  constructor(private _route: ActivatedRoute, private _reparationClaimService: ReparationClaimService,
    private _storageService: StorageService) {
    this.answer = '';
    this.statusSubmit = '';
   }

  ngOnInit(): void {

  }

  getIdReparationClaim(): number{
    let id: number = 0;
    this._route.params.subscribe(
      params => {
        id = params['idReparationClaim'];
      }
    );
    return id;
  }

  onSubmit(form: any){
    var idReparationClaim = this.getIdReparationClaim();
    var reparationClaimAnswer = new ReparationClaimAnswer(idReparationClaim, this.answer);
   
    this._reparationClaimService.answerClaim(reparationClaimAnswer,this._storageService.getTokenValue()).subscribe({
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
