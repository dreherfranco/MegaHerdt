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
import { PurchaseArticleSerialNumber } from 'src/app/models/PurchaseArticleSerialNumber/PurchaseArticleSerialNumber';
import { DialogShowSerialNumbersComponent } from '../dialog-show-serial-numbers/dialog-show-serial-numbers.component';
import { ArticleProviderSerialNumber } from 'src/app/models/ArticleProviderSerialNumber/ArticleProviderSerialNumber';

@Component({
  selector: 'app-provision-stock-discounted-grid',
  templateUrl: './provision-stock-discounted-grid.component.html',
  styleUrls: ['./provision-stock-discounted-grid.component.css']
})
export class ProvisionStockDiscountedGridComponent implements OnInit {
  articlesProviders: Array<ArticleProvider>;
  paginate: Paginate;
  searchText: string = "";
  @ViewChild('content', { static: true }) content!: ElementRef;
  sortedData: ArticleProvider[] = [];

  constructor(private _articleProvisionService: ArticleProvisionService,
    private _storageService: StorageService,
    public dialog: MatDialog) {
    this.articlesProviders = new Array<ArticleProvider>();
    this.paginate = new Paginate(1,6);
   }

  ngOnInit(): void {
    this.loadArticlesProviders();
  }



  loadArticlesProviders(){
    this._articleProvisionService.getAllDiscounted().subscribe({
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

function compare(a: number | string | Date | boolean | string[], b: number | string | Date | boolean | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}