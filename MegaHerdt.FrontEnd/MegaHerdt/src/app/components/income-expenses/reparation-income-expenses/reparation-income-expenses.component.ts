import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsIncomeExpenses } from 'src/app/models/IncomeExpenses/DetailsIncomeExpenses';
import { IncomeExpenses } from 'src/app/models/IncomeExpenses/IncomeExpenses';
import { Paginate } from 'src/app/models/Paginate/Paginate';

@Component({
  selector: 'app-reparation-income-expenses',
  templateUrl: './reparation-income-expenses.component.html',
  styleUrls: ['./reparation-income-expenses.component.css']
})
export class ReparationIncomeExpensesComponent implements OnInit {
  @Input() reparationsIncomes: DetailsIncomeExpenses ;
  paginate: Paginate;

  constructor() {
    this.paginate = new Paginate(1,6);
    this.reparationsIncomes = new DetailsIncomeExpenses;
   }

  ngOnInit(): void {
  }

}
