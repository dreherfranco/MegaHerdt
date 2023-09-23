import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReparationClaimAnswerCreation } from 'src/app/models/ReparationClaims/ReparationClaimAnswerCreation';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ReparationClaimService } from 'src/app/services/reparation-claims/reparation-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-answer-reparation-claim',
  templateUrl: './answer-reparation-claim.component.html',
  styleUrls: ['./answer-reparation-claim.component.css']
})
export class AnswerReparationClaimComponent implements OnInit {
  answer: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _reparationClaimService: ReparationClaimService,
    private _storageService: StorageService) {
    this.answer = '';
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
    var identity = this._storageService.getIdentity();
    var reparationClaimAnswer = new ReparationClaimAnswerCreation(idReparationClaim, this.answer, identity.userName);
   
    this._reparationClaimService.answerClaim(reparationClaimAnswer,this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          AlertService.errorAlert('¡Error al intentar crear la respuesta de Reclamo!');
        }else{
          AlertService.successAlert('¡Respuesta de Reclamo efectuada correctamente!').then((result) => {
            if (result.isConfirmed) {     
              this._router.navigate(['/administrate/show-reparation-claims']);
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
