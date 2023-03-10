import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticleAdded } from 'src/app/models/Article/ReparationArticleAdded';
import { ReparationArticleCreation } from 'src/app/models/Article/ReparationArticleCreation';
import { BillCreation } from 'src/app/models/Bill/BillCreation';
import { ReparationCreation } from 'src/app/models/Reparation/ReparationCreation';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ReparationStateService } from 'src/app/services/reparation-states/reparation-state.service';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { BillTypeEnum } from 'src/app/utils/BillTypeEnum';
import { DialogAdminCreateUserComponent } from '../../users/admin-create-user/dialog-admin-create-user/dialog-admin-create-user.component';

@Component({
  selector: 'app-create-reparation',
  templateUrl: './create-reparation.component.html',
  styleUrls: ['./create-reparation.component.css']
})
export class CreateReparationComponent implements OnInit {
  clients: Array<UserDetail>;
  reparation: ReparationCreation;
  reparationsStates: Array<ReparationState>;
  statusSubmit: string;

  constructor(private _storageService: StorageService, private _userService: UserService,
    private _reparationStateService: ReparationStateService, private _reparationService: ReparationService,
    public dialog: MatDialog) {
    this.clients = new Array<UserDetail>();
    this.reparation = new ReparationCreation(1, '', '', 0, new Date(),
      new Array<ReparationArticleCreation>(), new BillCreation('0', ''));
    this.reparationsStates = new Array<ReparationState>();
    this.statusSubmit = "";
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadReparationsStates();
  }

  onSubmit(form: any) {
    var identity = this._storageService.getIdentity();
    this.reparation.employeeId = identity.id;
    this._reparationService.create(this.reparation, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al crear reparacion");
          this.statusSubmit = "failed";
        } else {
          this.statusSubmit = "success";
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  loadReparationsStates() {
    this._reparationStateService.getAll().subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los estados de las reparaciones");
        } else {
          this.reparationsStates = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadClients() {
    this._userService.getUsers(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los usuarios");
        } else {
          this.clients = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  openDialogAdminCreateUser(){
    const dialogRef = this.dialog.open(DialogAdminCreateUserComponent,
      {
        disableClose:true,
      });

    dialogRef.afterClosed().subscribe((result: any) => {
        this.loadClients();
    });
  }
}
