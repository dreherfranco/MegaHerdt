import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range-search',
  templateUrl: './date-range-search.component.html',
  styleUrls: ['./date-range-search.component.css']
})
export class DateRangeSearchComponent implements OnInit {
  dateRangeForm!: FormGroup;

 // @Output para emitir las fechas seleccionadas al componente padre
 @Output() dateRangeSelected = new EventEmitter<{ startDate: Date, endDate: Date }>();

  constructor() { }

  ngOnInit(): void {
    this.dateRangeForm = new FormGroup({
      start: new FormControl(new Date()),
      end: new FormControl(new Date())
    });
    
    this.setToday();  // Inicializamos la vista con los datos de hoy.
  }

  setToday() {
    const today = new Date();
    this.dateRangeForm.setValue({ start: today, end: today });
    //this.searchByRange();
    // Emitir las fechas seleccionadas al componente padre
    this.dateRangeSelected.emit({ startDate: today, endDate: today });
  }

  setYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.dateRangeForm.setValue({ start: yesterday, end: yesterday });
    //this.searchByRange();

    // Emitir las fechas seleccionadas al componente padre
    this.dateRangeSelected.emit({ startDate: yesterday, endDate: yesterday });
  }

  setCurrentMonth() {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    this.dateRangeForm.setValue({ start, end });

    // Emitir las fechas seleccionadas al componente padre
    this.dateRangeSelected.emit({ startDate: start, endDate: end });
    //this.searchByRange();
  }

  setPreviousMonth() {
    const start = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
    this.dateRangeForm.setValue({ start, end });
    //this.searchByRange();

    // Emitir las fechas seleccionadas al componente padre
    this.dateRangeSelected.emit({ startDate: start, endDate: end });
  }

  filterByThisYear() {
    const currentYear = new Date().getFullYear();
    const start = new Date(currentYear, 0, 1); // 1 de enero del año actual
    const end = new Date(currentYear + 1, 0, 1); // 1 de enero del año siguiente
    this.dateRangeForm.setValue({ start, end });

    // Emitir las fechas seleccionadas al componente padre
    this.dateRangeSelected.emit({ startDate: start, endDate: end });
    //this.searchByRange();
  }
  
  filterByLastYear() {
    const lastYear = new Date().getFullYear() - 1;
    const start = new Date(lastYear, 0, 1); // 1 de enero del año pasado
    const end = new Date(lastYear + 1, 0, 1); // 1 de enero del año siguiente
    this.dateRangeForm.setValue({ start, end });

    // Emitir las fechas seleccionadas al componente padre
    this.dateRangeSelected.emit({ startDate: start, endDate: end });

    //this.searchByRange();
  }
}
