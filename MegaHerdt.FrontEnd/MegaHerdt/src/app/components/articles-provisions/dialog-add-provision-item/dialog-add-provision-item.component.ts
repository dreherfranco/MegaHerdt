import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleProviderItem } from 'src/app/models/ArticleProvider/ArticleProviderItem';
import { ArticleProviderSerialNumber } from 'src/app/models/ArticleProviderSerialNumber/ArticleProviderSerialNumber';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-dialog-add-provision-item',
  templateUrl: './dialog-add-provision-item.component.html',
  styleUrls: ['./dialog-add-provision-item.component.css']
})
export class DialogAddProvisionItemComponent implements OnInit {
  articles: Array<ArticleName>;
  articleProviderItem: ArticleProviderItem;
  serialNumberToAdd: string = '';
  serialNumberRepeted: boolean = false;
  isNewItem: boolean;

  constructor(public dialogRef: MatDialogRef<DialogAddProvisionItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _articleService: ArticleService) 
    {
      this.articles = new Array<ArticleName>();
      this.articleProviderItem = new ArticleProviderItem();
      this.isNewItem = data.articleProviderItem == null; // Determina si es un nuevo ítem

      //console.log(data);
      //console.log(data.item);
      if (!this.isNewItem) {
        this.articleProviderItem = data.articleProviderItem as ArticleProviderItem; // Si no es nuevo, carga el ítem existente
      }
    }

  ngOnInit(): void {
    this.loadArticles();
  }

  disableAcceptButton(){
    if(this.articleProviderItem.articleId == 0 
      || this.articleProviderItem.articleQuantity == 0 
      || this.articleProviderItem.articleQuantity < 0
      || this.articleProviderItem.purchasePrice <= 0)
    {
      return true;
    }
    
    // Si el articulo debe definir Numero de Serie entocnes se tiene que definir la cantidad
    // de articulos a proveer
    if(this.articleProviderItem.articleQuantity > 0 && this.articleProviderItem.article?.hasSerialNumber)
    {
      if(this.articleProviderItem.serialNumbers.length != this.articleProviderItem.articleQuantity)
      {
        return true;
      }
    }

    return false;
  }

  confirm(){
    this.dialogRef.close(this.articleProviderItem);
  }

  closeModal(){
    this.dialogRef.close();
  }

  setSelectedArticle(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    // tengo que cortar el valor recibido porque viene un valor sucio con los ":" en el string
    const articleId = selectElement.value.split(":")[1].trim();

    // Encuentra el artículo seleccionado en el arreglo de artículos
    const selectedArticle = this.articles.find(article => article.id === Number(articleId));
    

    // Verifica si se encontró un artículo
    if (selectedArticle !== undefined) {
      // Asigna el artículo seleccionado al artículo del proveedor
      this.articleProviderItem.article = selectedArticle;
    } else {
      // Si no se encontró ningún artículo, puedes manejarlo de alguna manera, por ejemplo, mostrando un mensaje de error o tomando alguna acción alternativa.
      console.log("No se encontró ningún artículo con el ID especificado.");
    }
  }

  loadArticles() {
    this._articleService.getArticleNames().subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener articulos");
        } else {
          this.articles = response;
          this.articles = this.articles.filter(a => !this.data.articlesUsedIds.includes(a.id))
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  disabledSerialNumbers()
  {
    if(!(this.articleProviderItem.article?.hasSerialNumber ?? false)) return true;
    
    if(this.articleProviderItem.articleQuantity <= this.articleProviderItem.serialNumbers.length)
    {
        return true;
    } 
    return false;
  }

  addSerialNumber() {
    let newSerialNumber = this.serialNumberToAdd.trim(); // Eliminar espacios en blanco al principio y al final
    if (newSerialNumber !== "" && this.articleProviderItem.articleQuantity >= this.articleProviderItem.serialNumbers.length) {
        // Verificar si el número de serie ya existe en la lista
        const isDuplicate = this.articleProviderItem.serialNumbers.some(serial => serial.serialNumber === newSerialNumber);
        
        this.serialNumberRepeted = false;
        if (!isDuplicate) {
            this.articleProviderItem.serialNumbers.push(new ArticleProviderSerialNumber(newSerialNumber));
            this.serialNumberToAdd = '';
        } else {
            // Mostrar un mensaje de error o realizar otra acción para indicar que el número de serie ya existe
            console.log("El número de serie ya existe en la lista.");
            this.serialNumberRepeted = true;
        }
    }
  }

  deleteSerialNumber(serialNumber: string) 
  {
    this.articleProviderItem.serialNumbers = this.articleProviderItem.serialNumbers.filter(sn => sn.serialNumber !== serialNumber);
  }
}
