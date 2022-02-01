import { Component, OnInit } from '@angular/core';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ReparationClaim } from 'src/app/models/ReparationClaims/ReparationClaim';
import { ReparationClaimService } from 'src/app/services/reparation-claims/reparation-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-show-reparation-claims',
  templateUrl: './show-reparation-claims.component.html',
  styleUrls: ['./show-reparation-claims.component.css']
})
export class ShowReparationClaimsComponent implements OnInit {
  reparationClaims: Array<ReparationClaim>;
  paginate: Paginate;
  
  constructor(private _reparationClaimService: ReparationClaimService, private _storageService: StorageService) {
    this.reparationClaims = new Array<ReparationClaim>();
    this.paginate = new Paginate(1,6);
  }

  ngOnInit(): void {
    this.loadReparationClaims();
  }

  loadReparationClaims(){
    this._reparationClaimService.getAll(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los reclamos");
        } else {
          this.reparationClaims = response;
          console.log(this.reparationClaims);
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
