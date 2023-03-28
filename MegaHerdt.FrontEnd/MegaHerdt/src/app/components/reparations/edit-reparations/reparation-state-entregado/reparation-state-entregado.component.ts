import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-reparation-state-entregado',
  templateUrl: './reparation-state-entregado.component.html',
  styleUrls: ['./reparation-state-entregado.component.css']
})
export class ReparationStateENTREGADOComponent implements OnInit {
  reparations: Array<Reparation>;
  paginate: Paginate;
  @Input() searchText: string;

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService, public dialog: MatDialog) {
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1, 2);
    this.searchText = '';
  }

  ngOnInit(): void {
    this.loadReparations();
  }

  loadReparations() {
    let stateId = 6;
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

