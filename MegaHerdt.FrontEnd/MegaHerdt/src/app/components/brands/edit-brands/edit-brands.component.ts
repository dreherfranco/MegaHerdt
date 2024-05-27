import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { BrandService } from 'src/app/services/brand/brand.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { structuredClone } from 'src/app/utils/StructuredClone';

@Component({
  selector: 'app-edit-brands',
  templateUrl: './edit-brands.component.html',
  styleUrls: ['./edit-brands.component.css']
})
export class EditBrandsComponent implements OnInit {
  brands: Array<Brand>;
  brandsAux: Array<Brand>;
  brandsChanged: { [key: number]: boolean } = {};
  @ViewChild('content', { static: true }) content!: ElementRef;
  paginate: Paginate;
  searchText: string = "";

  constructor(private _storageService: StorageService, private _brandService: BrandService,public dialog: MatDialog) {
    this.brands = new Array<Brand>();
    this.brandsAux = new Array<Brand>();
    this.paginate = new Paginate(1,6);
  }


  ngOnInit(): void {
    this.loadBrands();
  }

  openDialogUpdate(brand: Brand) {
    AlertService.warningAlert(
      '¿Estas seguro que quiere actualizar esta Marca?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.updateBrand(brand);
      }
    });
  }
  
  loadBrands(){
    this._brandService.brands.subscribe({next: response => {
      this.brands = response;
      this.brandsAux = structuredClone(this.brands);
    }
  });
  }

  openDialogDelete(brandId: number) {
    AlertService.warningAlert(
      '¿Estas seguro que quiere eliminar esta Marca?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.deleteBrand(brandId);
      }
    });

  }

  deleteBrand(id: number){
    this._brandService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              AlertService.errorAlert('¡Error al intentar eliminar la Marca!');
          } else {
            this._brandService.updateBrands();
            AlertService.successAlert('¡Eliminada!', 'Marca eliminada correctamente');
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar eliminar la Marca!');
          console.log(err)
        }
    }
    );
  }

  onBrandChange(brandId: number) {
    const brand = this.brandsAux.find(brand => brand.id === brandId);
    const currentBrand = this.brands.find(brand => brand.id === brandId);
    this.brandsChanged[brandId] = brand?.name !== currentBrand?.name;
  }

  isChanged(brandId: number): boolean {
    return !!this.brandsChanged[brandId];
  }

  updateBrand(brand: Brand){
    this._brandService.update(brand, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              AlertService.errorAlert('¡Error al intentar actualizar la Marca!');
          } else {
            this.brandsChanged[brand.id] = !this.brandsChanged[brand.id];
            AlertService.successAlert('¡Actualizada!','Marca actualizada correctamente');
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar actualizar la Marca!');
          console.log(err)
        }
    }
    );
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }


}
