import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-income-expenses',
  templateUrl: './show-income-expenses.component.html',
  styleUrls: ['./show-income-expenses.component.css']
})
export class ShowIncomeExpensesComponent implements OnInit {
  selectedDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  showFormattedDate() {
    const day = formatDate(this.selectedDate, 'd', 'en-US');
    const month = formatDate(this.selectedDate, 'MMM', 'en-US');
    const year = formatDate(this.selectedDate, 'y', 'en-US');

    console.log(`Fecha formateada: ${day} de ${month} del ${year}`);
  }
}
