import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IncomeExpensesService } from 'src/app/services/income-expenses/income-expenses.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DetailsIncomeExpenses } from 'src/app/models/IncomeExpenses/DetailsIncomeExpenses';

@Component({
  selector: 'app-show-income-expenses',
  templateUrl: './show-income-expenses.component.html',
  styleUrls: ['./show-income-expenses.component.css']
})
export class ShowIncomeExpensesComponent implements OnInit, OnChanges {
  reparationsIncomes: DetailsIncomeExpenses = new DetailsIncomeExpenses();
  purchasesIncomes: DetailsIncomeExpenses = new DetailsIncomeExpenses();

  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() enumType!: string;

  constructor(private _storageService: StorageService, private incExpServices: IncomeExpensesService) 
  {
  }
  ngOnInit(): void {
  }

  // Detecta cambios en los inputs de fechas
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] || changes['endDate']) {
      // Ejecuta la búsqueda cuando cambien las fechas.
      console.log("llego");
      this.searchByRange();
    }
  }
  
  searchByRange() {
    const startDate = this.startDate;
    const endDate = this.endDate;

    switch (this.enumType) {
      case 'ventas':
        this.incExpServices.getPurchasesIncomesRange(this._storageService.getTokenValue(), startDate, endDate)
          .subscribe(result => {
            this.purchasesIncomes = result;
        });
        break;
      case 'reparaciones':
        this.incExpServices.getReparationsIncomesRange(this._storageService.getTokenValue(), startDate, endDate)
          .subscribe(result => {
            this.reparationsIncomes = result;
        });
        break;
    }
  }
}
