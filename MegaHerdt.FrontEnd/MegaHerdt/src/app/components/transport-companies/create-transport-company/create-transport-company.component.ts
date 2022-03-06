import { Component, OnInit } from '@angular/core';
import { TransportCompany } from 'src/app/models/TransportCompany/TransportCompany';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TransportCompanyService } from 'src/app/services/transport-companies/transport-company.service';

@Component({
  selector: 'app-create-transport-company',
  templateUrl: './create-transport-company.component.html',
  styleUrls: ['./create-transport-company.component.css']
})
export class CreateTransportCompanyComponent implements OnInit {
  transportCompany: TransportCompany = new TransportCompany();
  statusSubmit: string = '';
  constructor(private _storageService: StorageService, private _transportCompanyService: TransportCompanyService) {

   }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._transportCompanyService.create(this.transportCompany, this._storageService.getTokenValue()).subscribe(
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
