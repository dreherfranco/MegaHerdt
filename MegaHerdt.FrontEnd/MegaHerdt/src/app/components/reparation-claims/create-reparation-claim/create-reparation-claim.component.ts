import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReparationClaimCreation } from 'src/app/models/ReparationClaims/ReparationClaimCreation';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ReparationClaimService } from 'src/app/services/reparation-claims/reparation-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-reparation-claim',
  templateUrl: './create-reparation-claim.component.html',
  styleUrls: ['./create-reparation-claim.component.css']
})
export class CreateReparationClaimComponent implements OnInit {
  description: string;

  constructor(private _route: ActivatedRoute, 
    private _reparationClaimService: ReparationClaimService,
    private _storageService: StorageService, 
    private location: Location) 
    {
      this.description = '';
    }

  ngOnInit(): void {

  }

  goBack() {
    this.location.back();
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
