import { Component, OnInit } from '@angular/core';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-reparation-record',
  templateUrl: './reparation-record.component.html',
  styleUrls: ['./reparation-record.component.css']
})
export class ReparationRecordComponent implements OnInit {
  reparations: Array<Reparation>;

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService) { 
    this.reparations = new Array<Reparation>();
  }

  ngOnInit(): void {
    this.loadReparations();
  }

  loadReparations(){
    var identity: UserDetail = this._storageService.getIdentity();
    this._reparationService.getClientReparations(identity.id, this._storageService.getTokenValue()).subscribe({
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
