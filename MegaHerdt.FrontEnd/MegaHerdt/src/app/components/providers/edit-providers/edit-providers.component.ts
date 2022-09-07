import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/Provider/Provider';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateProviderComponent } from './dialog-update-provider/dialog-update-provider.component';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-edit-providers',
  templateUrl: './edit-providers.component.html',
  styleUrls: ['./edit-providers.component.css']
})
export class EditProvidersComponent implements OnInit {
  providers: Array<Provider>;
  statusSubmit: string;

  constructor(private _storageService: StorageService, private _providerService: ProviderService,public dialog: MatDialog) {
    this.providers = new Array<Provider>();
    this.statusSubmit = "";
  }


  ngOnInit(): void {
    this.loadProviders();
  }

  openDialogUpdate(provider: Provider) {
    const dialogRef = this.dialog.open(DialogUpdateProviderComponent,
      {
        disableClose:true,
        data: provider
      });

    dialogRef.afterClosed().subscribe((result: Provider) => {
      if(result != undefined){
        this.updateProvider(result);
      }
    });
  }
  
  loadProviders(){
    this._providerService.getAllEnableds(this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar los proveedores");
          } else {
            this.providers = response;
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    });
  }

  openDialogDelete(providerId: number) {
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent,
      {
        disableClose:true,
        data: providerId
      });

    dialogRef.afterClosed().subscribe((result: number) => {
      if(result != undefined){
        this.deleteProvider(result);
      }
    });
  }

  deleteProvider(id: number){
    this._providerService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las categorias");
          } else {
            this.loadProviders();
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    }
    );
  }

  updateProvider(provider: Provider){
    this._providerService.update(provider, this._storageService.getTokenValue()).subscribe({
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
