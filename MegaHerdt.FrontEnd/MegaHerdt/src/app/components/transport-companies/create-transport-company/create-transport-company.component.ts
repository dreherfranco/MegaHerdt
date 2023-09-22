import { Component, OnInit } from '@angular/core';
import { TransportCompany } from 'src/app/models/TransportCompany/TransportCompany';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TransportCompanyService } from 'src/app/services/transport-companies/transport-company.service';

@Component({
  selector: 'app-create-transport-company',
  templateUrl: './create-transport-company.component.html',
  styleUrls: ['./create-transport-company.component.css']
})
export class CreateTransportCompanyComponent implements OnInit {
  transportCompany: TransportCompany = new TransportCompany();
  constructor(private _storageService: StorageService, private _transportCompanyService: TransportCompanyService) {

   }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._transportCompanyService.create(this.transportCompany, this._storageService.getTokenValue()).subscribe(
      {
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error al intentar crear la Compania de Transporte!');
          } else {
            AlertService.successAlert('Compania de Transporte creada correctamente!').then((result) => {
              if (result.isConfirmed) {     
                  // Limpia el formulario.           
                  window.location.reload();
              }
            });
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar crear la Compania de Transporte!');
          console.log(err)
        }
      }
    );
  }
}
