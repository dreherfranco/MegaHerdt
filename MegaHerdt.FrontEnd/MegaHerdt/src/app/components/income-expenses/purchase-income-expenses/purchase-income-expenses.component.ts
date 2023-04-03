import { Component, Input, OnInit } from '@angular/core';
import { DetailsIncomeExpenses } from 'src/app/models/IncomeExpenses/DetailsIncomeExpenses';
import { Paginate } from 'src/app/models/Paginate/Paginate';

@Component({
  selector: 'app-purchase-income-expenses',
  templateUrl: './purchase-income-expenses.component.html',
  styleUrls: ['./purchase-income-expenses.component.css']
})
export class PurchaseIncomeExpensesComponent implements OnInit {
  @Input() purchasesIncomes: DetailsIncomeExpenses ;
  paginate: Paginate;

  constructor() {
    this.paginate = new Paginate(1,6);
    this.purchasesIncomes = new DetailsIncomeExpenses;
   }

  ngOnInit(): void {
  }

}
