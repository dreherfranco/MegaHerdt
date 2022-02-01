import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReparationClaimCreation } from 'src/app/models/ReparationClaims/ReparationClaimCreation';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationClaimService } from 'src/app/services/reparation-claims/reparation-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-reparation-claim',
  templateUrl: './create-reparation-claim.component.html',
  styleUrls: ['./create-reparation-claim.component.css']
})
export class CreateReparationClaimComponent implements OnInit {
  description: string;
  statusSubmit: string;

  constructor(private _route: ActivatedRoute, private _reparationClaimService: ReparationClaimService,
    private _storageService: StorageService) {
      this.description = '';
      this.statusSubmit = '';
   }

  ngOnInit(): void {

  }

  getReparationId(): number{
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
    let reparationId = this.getReparationId();
    let reparationClaim = new ReparationClaimCreation(identity.id,reparationId, this.description, new Date());
    
    this._reparationClaimService.create(reparationClaim,this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al guardar el reclamo");
          this.statusSubmit = "failed";
        }else{
          console.log("el reclamo se creo correctamente");
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
