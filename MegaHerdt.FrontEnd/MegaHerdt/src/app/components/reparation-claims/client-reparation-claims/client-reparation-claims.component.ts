import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationClaim } from 'src/app/models/ReparationClaims/ReparationClaim';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationClaimService } from 'src/app/services/reparation-claims/reparation-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogShowReparationDetailComponent } from '../../reparations/dialog-show-reparation-detail/dialog-show-reparation-detail.component';
import { DialogShowReparationClaimAnswersComponent } from '../dialog-show-reparation-claim-answers/dialog-show-reparation-claim-answers.component';

@Component({
  selector: 'app-client-reparation-claims',
  templateUrl: './client-reparation-claims.component.html',
  styleUrls: ['./client-reparation-claims.component.css']
})
export class ClientReparationClaimsComponent implements OnInit {
  reparationClaims: Array<ReparationClaim>;
  paginate: Paginate;

  constructor(private _reparationClaimService: ReparationClaimService, 
    private _storageService: StorageService, public dialog: MatDialog) {
    this.reparationClaims = new Array<ReparationClaim>();
    this.paginate = new Paginate(1,6);
   }

  ngOnInit(): void {
    this.loadReparationClaims();
  }

  openDialog(reparation: Reparation){
    this.dialog.open(DialogShowReparationDetailComponent,
      {
        disableClose:true,
        data: reparation
      });
  }

  loadReparationClaims(){
    let identity: UserDetail = this._storageService.getIdentity();
    
    this._reparationClaimService.getByClientId(identity.id, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los reclamos");
        } else {
          this.reparationClaims = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  openDialogClaimAnswers(reparationClaimId: number){
    this.dialog.open(DialogShowReparationClaimAnswersComponent,
      {
        disableClose:true,
        data: reparationClaimId
      });
  }
}
