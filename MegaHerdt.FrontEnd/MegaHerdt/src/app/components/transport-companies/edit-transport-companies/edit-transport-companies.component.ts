import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransportCompany } from 'src/app/models/TransportCompany/TransportCompany';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TransportCompanyService } from 'src/app/services/transport-companies/transport-company.service';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogUpdateTransportCompanyComponent } from './dialog-update-transport-company/dialog-update-transport-company.component';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-edit-transport-companies',
  templateUrl: './edit-transport-companies.component.html',
  styleUrls: ['./edit-transport-companies.component.css']
})
export class EditTransportCompaniesComponent implements OnInit {
  transportCompanies: Array<TransportCompany> = new Array<TransportCompany>();
  @ViewChild('content', { static: true }) content!: ElementRef;
  searchText: string = '';
  
  constructor(private _storageService: StorageService, private _transportCompanyService: TransportCompanyService,
    public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.loadTransportCompanies();
  }

  openDialogUpdate(transportCompany: TransportCompany) {
    AlertService.warningAlert(
      '¿Estas seguro que quiere actualizar esta Compania de Transporte?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.updateTransportCompany(transportCompany);
      }
    });
  }
  
  loadTransportCompanies(){
    this._transportCompanyService.getAll().subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las empresas de transporte");
          } else {
            this.transportCompanies = response;
          }
        },
        error: (err) => {
          console.log(err)
        }
    });
  }

  openDialogDelete(transportCompanyId: number) {
    AlertService.warningAlert(
      '¿Estas seguro que quiere eliminar esta Compania de Transporte?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.deleteTransportCompany(transportCompanyId);
      }
    });
  }

  deleteTransportCompany(id: number){
    this._transportCompanyService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error al intentar eliminar la Compania de Transporte!');
          } else {
            this.loadTransportCompanies();
            AlertService.successAlert('¡Eliminada!','Compania de Transporte eliminada correctamente');
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar eliminar la Compania de Transporte!');
          console.log(err)
        }
    }
    );
  }

  updateTransportCompany(transportCompany: TransportCompany){
    this._transportCompanyService.update(transportCompany, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error al intentar actualizar la Compania de Transporte!');
          } else {
            AlertService.successAlert('¡Actualizada!','Compania de Transporte actualizada correctamente');
          }
        },
        error: (err) => {
          console.log(err)
          AlertService.errorAlert('¡Error al intentar actualizar la Compania de Transporte!');
        }
    }
    );
  }

  generatePDF() {
    PDFGenerator.generatePDF(this.content);
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }
}
