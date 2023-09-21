import { Component, OnInit } from '@angular/core';
import { BrandCreation } from 'src/app/models/ArticleBrand/BrandCreation';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { BrandService } from 'src/app/services/brand/brand.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
  brand: BrandCreation;

  constructor(private _storageService: StorageService, private _brandService: BrandService) {
    this.brand = new BrandCreation("");
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._brandService.create(this.brand, this._storageService.getTokenValue()).subscribe(
        {
          next: (response) => {
            if (response.error) {
              AlertService.errorAlert('¡Error al intentar crear la Marca!');
            } else {
             this._brandService.updateBrands();
             
              AlertService.successAlert('¡Marca creada correctamente!').then((result) => {
                if (result.isConfirmed) {     
                    // Limpia el formulario.           
                    form.reset();
                }
              });
            }
          },
          error: (err) => {
            AlertService.errorAlert('¡Error al intentar crear la Marca!');
            console.log(err)
          }
        }
      );
    }
}
