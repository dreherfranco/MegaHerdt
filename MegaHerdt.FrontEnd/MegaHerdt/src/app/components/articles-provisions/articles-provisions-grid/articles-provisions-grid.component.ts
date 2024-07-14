import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleProvider } from 'src/app/models/ArticleProvider/ArticleProvider';
import { ArticleProviderUpdate } from 'src/app/models/ArticleProvider/ArticleProviderUpdate';
import { ArticleProviderVoucherUpdate } from 'src/app/models/ArticleProvider/ArticleProviderVoucherUpdate';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Provider } from 'src/app/models/Provider/Provider';
import { ArticleProvisionService } from 'src/app/services/articles-provisions/article-provision.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { Sort } from '@angular/material/sort';
import { delay } from 'lodash';

@Component({
  selector: 'app-articles-provisions-grid',
  templateUrl: './articles-provisions-grid.component.html',
  styleUrls: ['./articles-provisions-grid.component.css']
})
export class ArticlesProvisionsGridComponent implements OnInit {
  providers: Array<Provider>;
  articles: Array<ArticleName>;
  articlesProviders: Array<ArticleProvider>;
  paginate: Paginate;
  searchText: string = "";
  @ViewChild('content', { static: true }) content!: ElementRef;
  sortedData: ArticleProvider[] = [];

  constructor(private _articleProvisionService: ArticleProvisionService,
    private _storageService: StorageService,
    public dialog: MatDialog) {
    this.providers = new Array<Provider>();
    this.articles = new Array<ArticleName>();
    this.articlesProviders = new Array<ArticleProvider>();
    this.paginate = new Paginate(1,6);
   }

  ngOnInit(): void {
    this.loadArticlesProviders();
  }

  openDialogUpdate(articleProvider: ArticleProvider){     
    AlertService.warningAlert(
      '¿Estas seguro que quieres actualizar esta Provisión?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.update(articleProvider);
      }
    });
  }

  mapperArticleProvider(articleProvider: ArticleProvider){
    return new ArticleProviderUpdate(articleProvider.id,articleProvider.provider.id,articleProvider.provisionDate);
  }

  update(articleProvider: ArticleProvider){
    var articleProviderUpdate = this.mapperArticleProvider(articleProvider);
    this._articleProvisionService.update(articleProviderUpdate, this._storageService.getTokenValue())
    .subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar actualizar la Provisión!');
        } else {
          AlertService.successAlert('¡Actualizada!','Provisión actualizada correctamente');
        }
      },
      error: (err) => {
        console.log(err)
        AlertService.errorAlert('¡Error al intentar actualizar la Provisión!');

      }
    });
  }

  openDialogDelete(articleProviderId: number){     
    AlertService.warningAlert(
      '¿Estas seguro que quiere eliminar esta Provisión?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.deleteArticleProvider(articleProviderId);
      }
    });
  } 

  deleteArticleProvider(id: number){
    this._articleProvisionService.delete(id, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar eliminar la Provisión!');
        } else {
          this._articleProvisionService.updateArticleProviders();
          AlertService.successAlert('¡Eliminada!', 'Provisión eliminada correctamente');
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar eliminar la Provisión!');
        console.log(err)
      }
    });
  }

  loadArticlesProviders(){
    this._articleProvisionService.getAll().subscribe({
      next: (response) => {
        if (response.error) {
            console.log("no se pudieron cargar los proveedores");
        } else {
          this.articlesProviders = response;
          this.sortedData = this.articlesProviders.slice();
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
 
  }

  onChange(fileInput: any, articleProvider: ArticleProvider){
    var voucher = new File(new Array,'')
    voucher = <File>fileInput.target.files[0];
    var extension = voucher.name.split('.').pop();

    if(extension !== undefined)
    {
      this._articleProvisionService.voucherIsValid(extension).subscribe({
        next: res => 
        {
          if(!res)
          {
            AlertService.errorAlert('¡Extensión de imagen incorrecta!', 'Ingrese una imagen valida.');
          }else
          {
            var articleProviderVoucherUpdate = new ArticleProviderVoucherUpdate(articleProvider.id, voucher);
            this._articleProvisionService.sendFormData(articleProviderVoucherUpdate,"update-voucher");
            
            setTimeout(() => 
            {           
                 window.location.reload();
            }, 1500);
          }
        }
      })
    }

  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  sortData(sort: Sort) {
    const data = this.articlesProviders.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'providerEmail':
          return compare(a.provider.email, b.provider.email, isAsc);
        case 'provisionDate':
            return compare(a.provisionDate, b.provisionDate, isAsc);
        case 'operation':
            return compare(a.add, b.add, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string | Date | boolean | string[], b: number | string | Date | boolean | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
