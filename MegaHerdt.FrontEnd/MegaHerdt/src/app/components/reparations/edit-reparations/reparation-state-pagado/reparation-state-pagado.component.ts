import { Component, OnInit } from '@angular/core';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-reparation-state-pagado',
  templateUrl: './reparation-state-pagado.component.html',
  styleUrls: ['./reparation-state-pagado.component.css']
})
export class ReparationStatePAGADOComponent implements OnInit {
  reparations: Array<Reparation>;
  paginate: Paginate;

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService) {
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1, 2);
  }

  ngOnInit(): void {
    this.loadReparations();
  }

  loadReparations() {
    let stateId = 7;
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
