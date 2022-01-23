import { Component, OnInit } from '@angular/core';
import { ProviderCreation } from 'src/app/models/Provider/ProviderCreation';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {
  provider: ProviderCreation;
  statusSubmit: string;
  constructor(private _storageService: StorageService, private _providerService: ProviderService) {
    this.provider = new ProviderCreation("","","");
    this.statusSubmit = "";
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._providerService.create(this.provider, this._storageService.getTokenValue()).subscribe(
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
