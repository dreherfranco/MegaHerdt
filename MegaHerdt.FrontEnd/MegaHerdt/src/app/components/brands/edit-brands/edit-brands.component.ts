import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { BrandService } from 'src/app/services/brand/brand.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateBrandComponent } from './dialog-update-brand/dialog-update-brand.component';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-edit-brands',
  templateUrl: './edit-brands.component.html',
  styleUrls: ['./edit-brands.component.css']
})
export class EditBrandsComponent implements OnInit {
  brands: Array<Brand>;
  @ViewChild('content', { static: true }) content!: ElementRef;
  paginate: Paginate;

  constructor(private _storageService: StorageService, private _brandService: BrandService,public dialog: MatDialog) {
    this.brands = new Array<Brand>();
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
    this._brandService.brands.subscribe({next: response => this.brands = response});
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

  updateBrand(brand: Brand){
    this._brandService.update(brand, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              AlertService.errorAlert('¡Error al intentar actualizar la Marca!');
          } else {
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
  
  generatePDF() {
    PDFGenerator.generatePDF(this.content);
  }
}
