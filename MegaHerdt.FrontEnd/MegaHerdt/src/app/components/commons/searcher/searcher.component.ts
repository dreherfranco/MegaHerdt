import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  // Propiedades de entrada
  // -----------------------------------------------------------------------
  @Input() isVisible: boolean = false;
  /** Css class aplicada al contenedor primario */
  @Input() mainContainerCssClass: string = 'd-flex row w-75';
  /** Css class aplicada al contenedor secundario */
  @Input() secondaryContainerCssClass: string = 'col-md-10 pl-0';
  /** Css class aplicada al contenedor terciario */
  @Input() tertiaryContainerCssClass: string = 'col-md-12';

  // Eventos
  // -----------------------------------------------------------------------
  @Output() searchTextChange = new EventEmitter<string>();

  // Campos
  // -----------------------------------------------------------------------
  searchText: string = '';

  /**
   * Dispara el evento de cambio cuando se ingresa algun valor al buscador.
   * @param newSearchText 
   */
  onSearchTextChange(newSearchText: string) {
    this.searchTextChange.emit(newSearchText);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
