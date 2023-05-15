import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
}
