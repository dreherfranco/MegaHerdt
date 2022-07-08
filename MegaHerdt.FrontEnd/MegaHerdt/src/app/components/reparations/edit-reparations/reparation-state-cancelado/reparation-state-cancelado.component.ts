import { Component, OnInit } from '@angular/core';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-reparation-state-cancelado',
  templateUrl: './reparation-state-cancelado.component.html',
  styleUrls: ['./reparation-state-cancelado.component.css']
})
export class ReparationStateCANCELADOComponent implements OnInit {
  reparations: Array<Reparation>;
  paginate: Paginate;
  
  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService) { 
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1,2);
  }

  ngOnInit(): void {
    this.loadReparations();
  }

  loadReparations(){
    let stateId = 8;
    this._reparationService.getByStateId(stateId, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener reparaciones");
        } else {
          this.reparations = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
