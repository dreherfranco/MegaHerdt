import { Component, OnInit } from '@angular/core';
import { ReparationStateCreation } from 'src/app/models/ReparationState/ReparationStateCreation';
import { ReparationStateService } from 'src/app/services/reparation-states/reparation-state.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-reparation-states',
  templateUrl: './create-reparation-states.component.html',
  styleUrls: ['./create-reparation-states.component.css']
})
export class CreateReparationStatesComponent implements OnInit {
  reparationState: ReparationStateCreation;

  constructor(private _storageService: StorageService, private _reparationStateService: ReparationStateService) {
    this.reparationState = new ReparationStateCreation("");
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._reparationStateService.create(this.reparationState, this._storageService.getTokenValue()).subscribe(
      {
        next: (response) => {
          if (response.error) {
            console.log("error al crear el estado de reparacion")
          } else {
            window.location.reload();
          }
        },
        error: (err) => {
          console.log(err)
        }
      }
    );
  
  }
}
