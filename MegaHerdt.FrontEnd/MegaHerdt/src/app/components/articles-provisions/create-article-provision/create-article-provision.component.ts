import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleProviderCreation } from 'src/app/models/ArticleProvider/ArticleProviderCreation';
import { Provider } from 'src/app/models/Provider/Provider';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ArticleProvisionService } from 'src/app/services/articles-provisions/article-provision.service';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogAddProvisionItemComponent } from '../dialog-add-provision-item/dialog-add-provision-item.component';
import { ArticleProviderItem } from 'src/app/models/ArticleProvider/ArticleProviderItem';
import { ArticleProviderVoucherUpdate } from 'src/app/models/ArticleProvider/ArticleProviderVoucherUpdate';
import { ArticleProviderSerialNumber } from 'src/app/models/ArticleProviderSerialNumber/ArticleProviderSerialNumber';
import { DialogShowSerialNumbersComponent } from '../dialog-show-serial-numbers/dialog-show-serial-numbers.component';

@Component({
  selector: 'app-create-article-provision',
  templateUrl: './create-article-provision.component.html',
  styleUrls: ['./create-article-provision.component.css']
})
export class CreateArticleProvisionComponent implements OnInit {
  providers: Array<Provider>;
  // articles: Array<ArticleName>;
   articleProvider: ArticleProviderCreation;
  // serialNumberToAdd: string = '';

  constructor(private _articleProvisionService: ArticleProvisionService, 
              private _providerService: ProviderService,
             private _storageService: StorageService,
              public dialog: MatDialog) 
  {
    this.providers = new Array<Provider>();
    this.articleProvider = new ArticleProviderCreation(0, new File(new Array, ''), new Date(), true);
  }

  ngOnInit(): void {
    this.loadProviders();
  }

  onSubmit(form: any) {
    if(this.articleProvider.add){ this.articleProvider.discountReason = '#'; }

    var newArticleProvider = this.articleProvider;
    for (var element of newArticleProvider.articlesItems) {
      element.article = null;
    }

    this._articleProvisionService.create(newArticleProvider, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar crear la Provisión!', response.error);
        } else {
          this._articleProvisionService.updateArticleProviders();

          var articleProviderVoucherUpdate = new ArticleProviderVoucherUpdate(response.id, this.articleProvider.voucher);
          this._articleProvisionService.sendFormData(articleProviderVoucherUpdate,"update-voucher")
          
          AlertService.successAlert('!Provisión creada!', 'Provisión creada correctamente')
          .then((result) => {
            if (result.isConfirmed) {                
              window.location.reload();
            }
          });;

        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar crear la Provisión!', err.error.message);
        console.log(err)
      }
    });

  }

  loadProviders() {
    this._providerService.getAllEnableds(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se pudieron cargar los proveedores");
        } else {
          this.providers = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  

  onChange(fileInput: any) {
    this.articleProvider.voucher = <File>fileInput.target.files[0]
  }

  agregarItemProvision()
  {

    const dialogRef = this.dialog.open(DialogAddProvisionItemComponent,
      {
        data: null,
        height: '700px',
        width: '700px'
      });

    dialogRef.afterClosed().subscribe((result: ArticleProviderItem) => {
      if(result != undefined){
        this.articleProvider.articlesItems.push(result);
      }
    });
  }
  

  showSerialNumbers(serialNumbers: ArticleProviderSerialNumber[]){     
    const dialogRef = this.dialog.open(DialogShowSerialNumbersComponent,
      {
        data: serialNumbers,
        height: '300px',
        width: '300px'
      });

    dialogRef.afterClosed().subscribe((result: any) => {
      /**logica para aplicar luego de cerrar el dialogo */
    });
  }
}
