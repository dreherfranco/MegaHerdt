import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransportCompany } from 'src/app/models/TransportCompany/TransportCompany';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TransportCompanyService } from 'src/app/services/transport-companies/transport-company.service';
import { DialogUpdateTransportCompanyComponent } from './dialog-update-transport-company/dialog-update-transport-company.component';

@Component({
  selector: 'app-edit-transport-companies',
  templateUrl: './edit-transport-companies.component.html',
  styleUrls: ['./edit-transport-companies.component.css']
})
export class EditTransportCompaniesComponent implements OnInit {
  transportCompanies: Array<TransportCompany> = new Array<TransportCompany>();
  statusSubmit: string = '';

  constructor(private _storageService: StorageService, private _transportCompanyService: TransportCompanyService,
    public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.loadTransportCompanies();
  }

  openDialog(transportCompany: TransportCompany) {
    const dialogRef = this.dialog.open(DialogUpdateTransportCompanyComponent,
      {
        disableClose:true,
        data: transportCompany
      });

    dialogRef.afterClosed().subscribe((result: TransportCompany) => {
      if(result != undefined){
        this.updateTransportCompany(result);
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
            console.log(response)
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    });
  }

  deleteBrand(id: number){
    this._transportCompanyService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las categorias");
          } else {
            this.loadTransportCompanies();
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    }
    );
  }

  updateTransportCompany(transportCompany: TransportCompany){
    this._transportCompanyService.update(transportCompany, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las empresas de transporte");
          } else {
            this.statusSubmit = "success";
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    }
    );
  }

}
