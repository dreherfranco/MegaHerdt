import { Component, Input, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/User/UserDetail';

@Component({
  selector: 'app-user-detail-administrate',
  templateUrl: './user-detail-administrate.component.html',
  styleUrls: ['./user-detail-administrate.component.css']
})
export class UserDetailAdministrateComponent implements OnInit {

  @Input() user: UserDetail;

  constructor() { 
    this.user = new UserDetail('','','','','',[]) ;
  }

  ngOnInit(): void {
  }

}
