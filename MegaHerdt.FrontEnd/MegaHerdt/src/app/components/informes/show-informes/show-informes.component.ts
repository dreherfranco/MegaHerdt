import { Component, OnInit } from '@angular/core';

export enum ReportType {
  Ventas = 'ventas',
  Reparaciones = 'reparaciones',
  Clientes = 'clientes',
}

@Component({
  selector: 'app-show-informes',
  templateUrl: './show-informes.component.html',
  styleUrls: ['./show-informes.component.css']
})


export class ShowInformesComponent implements OnInit {
    // Control de informe seleccionado
    selectedReport: ReportType = ReportType.Reparaciones; // 'reparaciones' se muestra por defecto.
    ReportTypeEnum = ReportType;

  constructor() { }

  ngOnInit(): void {
  }
  currentReport: number = 1;
  startDate!: Date;
  endDate!: Date;

  loadReport(reportNumber: number) {
    this.currentReport = reportNumber;
  }

   // Método para manejar el evento emitido
  onDateRangeSelected(range: { startDate: Date, endDate: Date }) {
    this.startDate = range.startDate;
    this.endDate = range.endDate;
    
    // Aquí puedes realizar más acciones con el rango de fechas, como hacer otra búsqueda
    console.log('Rango de fechas seleccionado:', this.startDate, this.endDate);
  }
  
  selectReport(report: ReportType) {
    this.selectedReport = report;
  }
}
