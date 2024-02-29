import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  type!:string;
  isLoading: boolean = true;
  searchText!: string;
  articles: Article[] = [];
  bandArticles: boolean = true; // Bandera para cuando vuelve el isLoading. False = no hay articles.

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  // Maneja el evento cuando isLoading cambia a true en el hijo
  uploadCompleted(articles: Article[]): void {
    this.isLoading = false;

    this.bandArticles = ( (articles).length > 0 );
    
    if(articles.length === 0){
      AlertService.warningAlertAdvice(`¡No hay ${ (this.type == 'offer') ? 'ofertas' : 'articulos' } disponibles por el momento!`)
      .then(() => {
        this._router.navigate(['']);
      });
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.searchText = '';
    this.articles = [];

    this._route.data.subscribe(data => {      
      this.type = data['type']; // Data => default || brand || category || offer
    });
  }
  
}
