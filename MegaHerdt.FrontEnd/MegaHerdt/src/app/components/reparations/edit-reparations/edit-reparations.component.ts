import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticle } from 'src/app/models/Article/ReparationArticle';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ReparationStateService } from 'src/app/services/reparation-states/reparation-state.service';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { BillTypeEnum } from 'src/app/utils/BillTypeEnum';
import { ReparationStatesEnum } from 'src/app/utils/ReparationStatesEnum';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogUpdateReparationComponent } from './dialog-update-reparation/dialog-update-reparation.component';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-reparations',
  templateUrl: './edit-reparations.component.html',
  styleUrls: ['./edit-reparations.component.css']
})
export class EditReparationsComponent implements OnInit {
  paginate: Paginate;
  reparationStatesEnum = ReparationStatesEnum;
  reparationStateSelected = ReparationStatesEnum.INGRESO;
  searchText: string = '';
  @ViewChild('content', { static: true }) content!: ElementRef;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private _router: Router) 
  { 
    this.paginate = new Paginate(1,2);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const state = params['state']; // Aquí obtienes el valor del parámetro 'status'
      
      if(state !== null && state !== undefined){
        // Seteo el estado actual seleccionado
        this.reparationStateSelected = state;
      }

    });

  }

  onReparationStateChange() {
    // Navegar a la URL con el estado seleccionado
    this._router.navigate(['/administrate/administrate-reparations/edit', this.reparationStateSelected]);
  }

 

  generatePDF() {
    PDFGenerator.generatePDF(this.content);
  }
}
