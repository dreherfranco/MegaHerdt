import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { BrandService } from 'src/app/services/brand/brand.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateBrandComponent } from './dialog-update-brand/dialog-update-brand.component';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-edit-brands',
  templateUrl: './edit-brands.component.html',
  styleUrls: ['./edit-brands.component.css']
})
export class EditBrandsComponent implements OnInit {
  brands: Array<Brand>;
  statusSubmit: string;

  constructor(private _storageService: StorageService, private _brandService: BrandService,public dialog: MatDialog) {
    this.brands = new Array<Brand>();
    this.statusSubmit = "";
  }


  ngOnInit(): void {
    this.loadBrands();
  }

  openDialogUpdate(brand: Brand) {
    const dialogRef = this.dialog.open(DialogUpdateBrandComponent,
      {
        disableClose:true,
        data: brand
      });

    dialogRef.afterClosed().subscribe((result: Brand) => {
      if(result != undefined){
        this.updateBrand(result);
      }
    });
  }
  
  loadBrands(){
    this._brandService.brands.subscribe({next: response => this.brands = response});
  }

  openDialogDelete(brandId: number) {
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent,
      {
        disableClose:true,
        data: brandId
      });

    dialogRef.afterClosed().subscribe((result: number) => {
      if(result != undefined){
        this.deleteBrand(result);
      }
    });
  }

  deleteBrand(id: number){
    this._brandService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las categorias");
          } else {
            this._brandService.updateBrands();
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    }
    );
  }

  updateBrand(brand: Brand){
    this._brandService.update(brand, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las categorias");
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
