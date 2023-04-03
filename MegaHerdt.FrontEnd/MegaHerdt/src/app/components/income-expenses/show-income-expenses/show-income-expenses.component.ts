import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IncomeExpenses } from 'src/app/models/IncomeExpenses/IncomeExpenses';
import { IncomeExpensesService } from 'src/app/services/income-expenses/income-expenses.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { filter } from 'rxjs/operators';
import { DetailsIncomeExpenses } from 'src/app/models/IncomeExpenses/DetailsIncomeExpenses';

@Component({
  selector: 'app-show-income-expenses',
  templateUrl: './show-income-expenses.component.html',
  styleUrls: ['./show-income-expenses.component.css']
})
export class ShowIncomeExpensesComponent implements OnInit {
  selectedDate: Date = new Date();
  reparationsIncomes: DetailsIncomeExpenses = new DetailsIncomeExpenses;
  purchasesIncomes: DetailsIncomeExpenses = new DetailsIncomeExpenses;

  constructor(private _storageService: StorageService,private incExpServices: IncomeExpensesService) { }

  ngOnInit(): void {
  }

  showFormattedDate() {
    const day = formatDate(this.selectedDate, 'd', 'en-US');
    const month = formatDate(this.selectedDate, 'MMM', 'en-US');
    const year = parseInt(formatDate(this.selectedDate, 'y', 'en-US'));

    console.log(`Fecha formateada: ${day} de ${month} del ${year}`);
  }

  searchByDay(){
    const day = parseInt(formatDate(this.selectedDate, 'd', 'en-US'));
    const month = parseInt(formatDate(this.selectedDate, 'M', 'en-US'));
    const year = parseInt(formatDate(this.selectedDate, 'y', 'en-US'));
    
    this.incExpServices.getReparationsIncomes(this._storageService.getTokenValue(), year, month, day).subscribe(result => {
      this.reparationsIncomes = result;
    });

    this.incExpServices.getPurchasesIncomes(this._storageService.getTokenValue(), year, month, day).subscribe(result => {
       this.purchasesIncomes = result;
    });
  }

  searchByMonth(){
    const month = parseInt(formatDate(this.selectedDate, 'M', 'en-US'));
    const year = parseInt(formatDate(this.selectedDate, 'y', 'en-US'));
    
    this.incExpServices.getReparationsIncomes(this._storageService.getTokenValue(), year, month).subscribe(result => {
          this.reparationsIncomes = result;
    });
    this.incExpServices.getPurchasesIncomes(this._storageService.getTokenValue(), year, month).subscribe(result => {
      this.purchasesIncomes = result;
    });
  }

  searchByYear(){
    const year = parseInt(formatDate(this.selectedDate, 'y', 'en-US'));

    this.incExpServices.getReparationsIncomes(this._storageService.getTokenValue(), year)
    .subscribe(
      result => {
             this.reparationsIncomes = result;
      }
    );

    this.incExpServices.getPurchasesIncomes(this._storageService.getTokenValue(), year)
    .subscribe(
      result => {
             this.purchasesIncomes = result;
      }
    );
  }
}
