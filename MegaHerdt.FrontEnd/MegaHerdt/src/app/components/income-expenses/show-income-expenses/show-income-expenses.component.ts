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
  reparationsIncomes$: BehaviorSubject<DetailsIncomeExpenses> = new BehaviorSubject<DetailsIncomeExpenses>(new DetailsIncomeExpenses);

  constructor(private _storageService: StorageService,private incExpServices: IncomeExpensesService, 
    private changeDetector: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.reparationsIncomes$.next(this.reparationsIncomes);
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
    
    this.incExpServices.getIncomes(this._storageService.getTokenValue(), year, month, day).subscribe(result => {
      console.log(result); // aquí maneja la respuesta del servidor
    });
  }

  searchByMonth(){
    const month = parseInt(formatDate(this.selectedDate, 'M', 'en-US'));
    const year = parseInt(formatDate(this.selectedDate, 'y', 'en-US'));
    
    this.incExpServices.getIncomes(this._storageService.getTokenValue(), year, month).subscribe(result => {
      console.log(result); // aquí maneja la respuesta del servidor
    });
  }

  searchByYear(){
    const year = parseInt(formatDate(this.selectedDate, 'y', 'en-US'));

    this.incExpServices.getIncomes(this._storageService.getTokenValue(), year)
    .subscribe(
      //console.log(result); // aquí maneja la respuesta del servidor
      {
        next: (response) => {
          if (response.error) {
            //this.statusSubmit = "failed";
          } else {
           // this.statusSubmit = "success";
             this.reparationsIncomes = response;
             this.changeDetector.detectChanges();
             this.reparationsIncomes$.next(this.reparationsIncomes);
             console.log(this.reparationsIncomes);
          }
        },
        error: (err) => {
          //this.statusSubmit = "failed";
          console.log(err)
        }
      }
    );
  }
}
