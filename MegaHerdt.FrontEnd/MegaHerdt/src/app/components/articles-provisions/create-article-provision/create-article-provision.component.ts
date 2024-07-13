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
    if (this.articleProvider.add) { 
        this.articleProvider.discountReason = '#'; 
    }

    // Hacer una copia profunda de articleProvider
    const originalArticleProvider = JSON.parse(JSON.stringify(this.articleProvider));

    // Nullear los objetos article
    for (const element of this.articleProvider.articlesItems) {
        element.article = null;
    }

    this._articleProvisionService.create(this.articleProvider, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
            if (response.error) {
                AlertService.errorAlert('¡Error al intentar crear la Provisión!', response.error);
                // Si hay un error, restaurar los datos originales
                this.articleProvider = originalArticleProvider;
            } else {
                this._articleProvisionService.updateArticleProviders();

                const articleProviderVoucherUpdate = new ArticleProviderVoucherUpdate(response.id, this.articleProvider.voucher);
                this._articleProvisionService.sendFormData(articleProviderVoucherUpdate,"update-voucher");

                AlertService.successAlert('¡Provisión creada!', 'Provisión creada correctamente').then((result) => {
                    if (result.isConfirmed) {                
                        window.location.reload();
                    }
                });
            }
        },
        error: (err) => {
            AlertService.errorAlert('¡Error al intentar crear la Provisión!', err.error.message);
            console.log(err);
            // Si hay un error, restaurar los datos originales
            this.articleProvider = originalArticleProvider;
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

    const dialogRef = this.dialog.open(DialogAddProvisionItemComponent, {
      data: 
      {
        articleProviderItem: null,
        articlesUsedIds: this.getArticlesUsedIds(null)
      },
      width: '48%',
      panelClass: 'custom-dialog-container'
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

  editItem(item: ArticleProviderItem){     
    // Crear una copia del objeto antes de abrir el diálogo
    const itemCopy = { ...item };

    const dialogRef = this.dialog.open(DialogAddProvisionItemComponent,
      {
        data:
        {
          articleProviderItem: itemCopy,
          articlesUsedIds: this.getArticlesUsedIds(item.articleId)
        }, // Pasar la copia del objeto al diálogo
        height: '700px',
        width: '700px'
      });

    dialogRef.afterClosed().subscribe((result: ArticleProviderItem) => {
      if(result != undefined){
        // Buscar el ítem existente y actualizarlo
        const index = this.articleProvider.articlesItems.findIndex(x => x.id === result.id);
        if (index !== -1) {
          this.articleProvider.articlesItems[index] = result;
        }
      }
    });
  }

  /**
     * Devuelve los ids de los articulos que serán utilizadas en la reparacion.
     * articleActualId: Indica en la edición el articulo que se va a editar para que no filtre de los articulos
     */
  getArticlesUsedIds(articleActualId: number | null )
  {
    var articlesUsedIds = new Array<Number>();
    for(let ai of this.articleProvider.articlesItems)
    {

      if(articleActualId === null)
      {
        articlesUsedIds.push(ai.articleId);
      }
      else if(articleActualId !== null && articleActualId !== ai.articleId)
      {
        articlesUsedIds.push(ai.articleId);
      }
    }
    return articlesUsedIds;
  }

}
