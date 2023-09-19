import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { filter } from 'lodash';
import { Debts } from 'src/app/models/Debts/Debts';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ReparationDebt } from 'src/app/models/Reparation/ReparationDebt';
import { DebtsService } from 'src/app/services/debts/debts.service';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';

@Component({
  selector: 'app-show-debtors',
  templateUrl: './show-debtors.component.html',
  styleUrls: ['./show-debtors.component.css']
})
export class ShowDebtorsComponent implements OnInit {
  debts: Debts = new Debts();
  reparationDebtsSortedData: ReparationDebt[] = [];

  paginate: Paginate;
  @ViewChild('content', { static: true }) content!: ElementRef;
  searchText: string = "";

  constructor(private DebtsService: DebtsService) 
  {
      this.paginate = new Paginate(1,6);
  }

  ngOnInit(): void {
    this.loadDebts();
  }

  loadDebts(){
    this.DebtsService.getAllDebtors()
    .subscribe({
      next: (res) =>{
        if(!res.error){
          this.debts = res;
          this.debts.reparationDebts = this.debts.reparationDebts.filter(r=> r.total > 0);
          this.reparationDebtsSortedData = this.debts.reparationDebts.slice();
        }else{
          console.log(res);
        }
      },
      error: (err) => console.log(err)
    })
  }

  generatePDF() {
    PDFGenerator.generatePDF(this.content);
  }

  sortData(sort: Sort) {
    const data = this.debts.reparationDebts.slice();
    if (!sort.active || sort.direction === '') {
      this.reparationDebtsSortedData = data;
      return;
    }

    this.reparationDebtsSortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'clientUsername':
          return compare(a.clientUserName, b.clientUserName, isAsc);
        case 'name':
            return compare(a.clientName, b.clientName, isAsc);;
        case 'surname':
            return compare(a.clientSurname, b.clientSurname, isAsc);
        case 'dni':
            return compare(a.clientDni, b.clientDni, isAsc);
        case 'total':
            return compare(a.total, b.total, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string | Date | string[], b: number | string | Date | string[], isAsc: boolean) {
  
   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}