import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Provider } from 'src/app/models/Provider/Provider';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-providers-form',
  templateUrl: './providers-form.component.html',
  styleUrls: ['./providers-form.component.css']
})

export class ProvidersFormComponent implements OnInit {
  provider: Provider;

  constructor(@Optional() public dialogRef: MatDialogRef<ProvidersFormComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Provider, 
              private _storageService: StorageService, 
              private _providerService: ProviderService) 
  {
    this.provider = new Provider();
  }

  ngOnInit(): void 
  {
    if(this.dialogRef)
      {
        this.provider = { ...this.data };
      }
  }

  confirm(){
    // Caso Update, se usa como dialogo
    if(this.dialogRef)
    {
      this.dialogRef.close(this.provider);
    }
    // Caso de Creación
    else
    {
      this.onCreate();
    }
  }

  closeModal(){
    this.dialogRef.close();
  }

  onCreate(form: any = null){
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
