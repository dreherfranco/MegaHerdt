import { Component, OnInit } from '@angular/core';
import { BrandCreation } from 'src/app/models/ArticleBrand/BrandCreation';
import { BrandService } from 'src/app/services/brand/brand.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
  brand: BrandCreation;
  statusSubmit: string;
  constructor(private _storageService: StorageService, private _brandService: BrandService) {
    this.brand = new BrandCreation("");
    this.statusSubmit = "";
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._brandService.create(this.brand, this._storageService.getTokenValue()).subscribe(
        {
          next: (response) => {
            if (response.error) {
              this.statusSubmit = "failed";
            } else {
              this.statusSubmit = "success";
              window.location.reload();
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
