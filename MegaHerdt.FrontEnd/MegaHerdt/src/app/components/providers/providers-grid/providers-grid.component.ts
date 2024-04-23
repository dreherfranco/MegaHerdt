import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Provider } from 'src/app/models/Provider/Provider';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Sort } from '@angular/material/sort';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ProvidersFormComponent } from '../providers-form/providers-form.component';

@Component({
  selector: 'app-providers-grid',
  templateUrl: './providers-grid.component.html',
  styleUrls: ['./providers-grid.component.css']
})
export class ProvidersGridComponent implements OnInit {
  providers: Array<Provider>;
  sortedData: Provider[] = [];
  @ViewChild('content', { static: true }) content!: ElementRef;
  paginate: Paginate;
  searchText: string = '';
  
  constructor(private _storageService: StorageService, 
              private _providerService: ProviderService,
              public dialog: MatDialog) 
  {
    this.providers = new Array<Provider>();
    this.paginate = new Paginate(1,6);
  }


  ngOnInit(): void {
    this.loadProviders();
  }

  openDialogUpdate(provider: Provider) 
  {
    const dialogRef = this.dialog.open(ProvidersFormComponent,
      {
        data: provider,
        height: '700px',
        width: '700px'
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
            this.sortedData = this.providers.slice();
          }
        },
        error: (err) => {
          console.log(err)
        }
    });
  }

  openDialogDelete(providerId: number) {
    AlertService.warningAlert(
      '¿Estas seguro que quiere eliminar este Proveedor?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.deleteProvider(providerId);
      }
    });
  }

  deleteProvider(id: number){
    this._providerService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error al intentar eliminar el Proveedor!');
          } else {
            this.loadProviders();
            AlertService.successAlert('¡Eliminado!','Proveedor eliminado correctamente').then(()=>
            {
              window.location.reload();
            });
          }
        },
        error: (err) => {
          console.log(err)
          AlertService.errorAlert('¡Error al intentar eliminar el Proveedor!');
        }
    }
    );
  }

  updateProvider(provider: Provider){
    this._providerService.update(provider, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error al intentar actualizar el Proveedor!');
          } else {
            AlertService.successAlert('¡Actualizado!','Proveedor actualizado correctamente').then(() =>
            {
                window.location.reload();
            });

          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar actualizar el Proveedor!');
          console.log(err)
        }
    }
    );
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }


  sortData(sort: Sort) {
    const data = this.providers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'phone':
          return compare(a.phone, b.phone, isAsc);
        case 'email':
            return compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string | Date | string[], b: number | string | Date | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
