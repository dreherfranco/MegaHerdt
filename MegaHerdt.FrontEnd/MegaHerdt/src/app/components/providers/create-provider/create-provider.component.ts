import { Component, OnInit } from '@angular/core';
import { ProviderCreation } from 'src/app/models/Provider/ProviderCreation';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {
  provider: ProviderCreation;

  constructor(private _storageService: StorageService, private _providerService: ProviderService) {
    this.provider = new ProviderCreation("","","");
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._providerService.create(this.provider, this._storageService.getTokenValue()).subscribe(
        {
          next: (response) => {          
            if (response.error) {
              AlertService.errorAlert('¡Error al intentar crear el Proveedor!');
            } else {
              
              AlertService.successAlert('¡Proveedor creado correctamente!').then((result) => {
                if (result.isConfirmed) {     
                    // Limpia el formulario.           
                 //   form.reset();
                    window.location.reload();
                }
              });
            }
          },
          error: (err) => {
            AlertService.errorAlert('¡Error al intentar crear el Proveedor!');
            console.log(err)
          }
        }
      );
    }

}
