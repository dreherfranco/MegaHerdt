import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from 'src/app/models/Article/Article';
import { ArticleWithSerialNumbers, SerialNumbersSelection, SerialNumbersSelectionItem } from 'src/app/models/Article/ArticleWithSerialNumbers';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ArticleService } from 'src/app/services/articles/article.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-discount-stock',
  templateUrl: './discount-stock.component.html',
  styleUrls: ['./discount-stock.component.css']
})
export class DiscountStockComponent implements OnInit {
  article: Article;
  // Lista que recibo los datos del backend, solo se utiliza para luego volcar estos datos en serialNumbersSelection
  articleWithSerialNumbers: ArticleWithSerialNumbers = new ArticleWithSerialNumbers();
  // Lista de numeros de serie que se muestran en la vista para seleccionar los numeros de serie a dar de baja.
  serialNumbersSelection: SerialNumbersSelection = new SerialNumbersSelection();

  constructor(@Optional() public dialogRef: MatDialogRef<DiscountStockComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: Article, 
  private _storageService: StorageService, 
  private _articleService: ArticleService) 
  {
    this.article = new Article();
  }

  ngOnInit(): void {
    if(this.dialogRef)
      {
        this.article = { ...this.data };
      }

    this._articleService.getArticleWithSerialNumbers(this.article.id).subscribe({
      next: (response) => {
        if (response.error) {

          AlertService.errorAlert('¡Error al querer actualizar el artículo!');
        } else
         {
          /** ACA ESTA LA RESPUESTA DEL BACKEND QUE TENES QUE VER */
           console.log('response: ', response);
           this.articleWithSerialNumbers = response;
           console.log('articleWithSerialNumbers: ', this.articleWithSerialNumbers);

           this.loadSerialNumberSelectionList();
        }
      },
      error: (err) => {
        console.log(err);
        AlertService.errorAlert('Error al querer actualizar el artículo!');
      }
    });
  }

  loadSerialNumberSelectionList(){
    this.articleWithSerialNumbers.serialNumbers.forEach(i => {
      // Instancio la lista de numeros de serie a mostrar en la lista de checkboxes
      this.serialNumbersSelection.serialNumbers.push(new SerialNumbersSelectionItem(i, false));
   });
  }

  confirm(){
    // Caso Update, se usa como dialogo
    if(this.dialogRef)
    {
      let serialNumbersSelected = this.serialNumbersSelection.serialNumbers.filter(i => i.selected);
      // Mapear para obtener solo la propiedad serialNumber
      let serialNumbers = serialNumbersSelected.map(i => i.serialNumber);

      // Armo la instancia para enviar al backend.
      let articleWithSerialNumbers = new ArticleWithSerialNumbers(this.article, serialNumbers, this.serialNumbersSelection.discountReason);
      // Devuelvo los numeros de serie seleccionados con su articulo correspondiente (ArticleWithSerialNumbers)
      this.dialogRef.close(articleWithSerialNumbers);
    }
    // Caso: el componente no se usa como Dialogo
    else
    {

    }
  }

  closeModal(){
    this.dialogRef.close();
  }

}
