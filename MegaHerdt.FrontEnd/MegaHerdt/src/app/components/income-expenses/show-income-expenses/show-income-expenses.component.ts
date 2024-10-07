import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IncomeExpensesService } from 'src/app/services/income-expenses/income-expenses.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DetailsIncomeExpenses } from 'src/app/models/IncomeExpenses/DetailsIncomeExpenses';

@Component({
  selector: 'app-show-income-expenses',
  templateUrl: './show-income-expenses.component.html',
  styleUrls: ['./show-income-expenses.component.css']
})
export class ShowIncomeExpensesComponent implements OnInit {
  dateRangeForm!: FormGroup;
  reparationsIncomes: DetailsIncomeExpenses = new DetailsIncomeExpenses();
  purchasesIncomes: DetailsIncomeExpenses = new DetailsIncomeExpenses();

  constructor(private _storageService: StorageService, private incExpServices: IncomeExpensesService) 
  {
  }

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
    this.searchByRange();
  }

  setYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.dateRangeForm.setValue({ start: yesterday, end: yesterday });
    this.searchByRange();
  }

  setCurrentMonth() {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    this.dateRangeForm.setValue({ start, end });
    this.searchByRange();
  }

  setPreviousMonth() {
    const start = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
    this.dateRangeForm.setValue({ start, end });
    this.searchByRange();
  }

  filterByThisYear() {
    const currentYear = new Date().getFullYear();
    const start = new Date(currentYear, 0, 1); // 1 de enero del año actual
    const end = new Date(currentYear + 1, 0, 1); // 1 de enero del año siguiente
    this.dateRangeForm.setValue({ start, end });

    this.searchByRange();
  }
  
  filterByLastYear() {
    const lastYear = new Date().getFullYear() - 1;
    const start = new Date(lastYear, 0, 1); // 1 de enero del año pasado
    const end = new Date(lastYear + 1, 0, 1); // 1 de enero del año siguiente
    this.dateRangeForm.setValue({ start, end });

    this.searchByRange();
  }

  searchByRange() {
    const startDate = this.dateRangeForm.value.start;
    const endDate = this.dateRangeForm.value.end;

     // Hacer la búsqueda de ingresos y egresos en el rango
    this.incExpServices.getReparationsIncomesRange(this._storageService.getTokenValue(), startDate, endDate)
                        .subscribe(result => {
                          this.reparationsIncomes = result;
                        });

    this.incExpServices.getPurchasesIncomesRange(this._storageService.getTokenValue(), startDate, endDate)
    .subscribe(result => {
      this.purchasesIncomes = result;
    });
  }
}
