import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationClaim } from 'src/app/models/ReparationClaims/ReparationClaim';
import { ReparationClaimService } from 'src/app/services/reparation-claims/reparation-claim.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogShowReparationDetailComponent } from '../../reparations/dialog-show-reparation-detail/dialog-show-reparation-detail.component';
import { Sort } from '@angular/material/sort';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';

@Component({
  selector: 'app-show-reparation-claims',
  templateUrl: './show-reparation-claims.component.html',
  styleUrls: ['./show-reparation-claims.component.css']
})
export class ShowReparationClaimsComponent implements OnInit {
  reparationClaims: Array<ReparationClaim>;
  paginate: Paginate;
  @ViewChild('content', { static: true }) content!: ElementRef;
  sortedData: ReparationClaim[] = [];
  searchText: string = '';

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
        data: reparation,
        width: '550px'
      });
  }

  loadReparationClaims(){
    this._reparationClaimService.getAll(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los reclamos");
        } else {
          this.reparationClaims = response;
          this.sortedData = this.reparationClaims.slice();
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  generatePDF() {
    PDFGenerator.generatePDF(this.content);
  }
  
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  sortData(sort: Sort) {
    const data = this.reparationClaims.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
          case 'description':
            return compare(a.description, b.description, isAsc);
          case 'date':
            return compare(a.date, b.date, isAsc);
          case 'employeeEmail':
            return compare(a.reparation.employee.email, b.reparation.employee.email, isAsc);
          case 'clientEmail':
              return compare(a.reparation.client.email, b.reparation.client.email, isAsc);
          case 'answered':
            return compare(a.answered, b.answered, isAsc);
          default:
            return 0;
      }
    });
  }

}

function compare(a: number | boolean | string | Date | string[], b: number | boolean | string | Date | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}