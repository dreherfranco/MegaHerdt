import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IncomeExpenses } from 'src/app/models/IncomeExpenses/IncomeExpenses';
import { IncomeExpensesService } from 'src/app/services/income-expenses/income-expenses.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-show-income-expenses',
  templateUrl: './show-income-expenses.component.html',
  styleUrls: ['./show-income-expenses.component.css']
})
export class ShowIncomeExpensesComponent implements OnInit {
  selectedDate: Date = new Date();
  incomeExpenses: IncomeExpenses[] = [];

  constructor(private _storageService: StorageService,private miServicio: IncomeExpensesService) { }

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
    
    this.miServicio.getIncomes(this._storageService.getTokenValue(), year, month, day).subscribe(result => {
      console.log(result); // aquí maneja la respuesta del servidor
    });
  }

  searchByMonth(){
    const month = parseInt(formatDate(this.selectedDate, 'M', 'en-US'));
    const year = parseInt(formatDate(this.selectedDate, 'y', 'en-US'));
    
    this.miServicio.getIncomes(this._storageService.getTokenValue(), year, month).subscribe(result => {
      console.log(result); // aquí maneja la respuesta del servidor
    });
  }

  searchByYear(){
    const year = parseInt(formatDate(this.selectedDate, 'y', 'en-US'));

    this.miServicio.getIncomes(this._storageService.getTokenValue(), year).subscribe(
      //console.log(result); // aquí maneja la respuesta del servidor
      {
        next: (response) => {
          if (response.error) {
            //this.statusSubmit = "failed";
          } else {
           // this.statusSubmit = "success";
             this.incomeExpenses = response;
             console.log(this.incomeExpenses);
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
