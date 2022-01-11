import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressUpdate } from 'src/app/models/Address/AddressUpdate';
import { PhoneUpdate } from 'src/app/models/Phone/PhoneUpdate';
import { UserUpdate } from 'src/app/models/User/UserUpdate';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  user: UserUpdate;
  statusSubmit: String;
  phoneNumber: string;
  addressAddOk: boolean;
  phonesAddOk: boolean;

  constructor(private _userService: UserService, private _router: Router, 
    private _storageService: StorageService) 
    {
    this.user = new UserUpdate('', '', '', '', '', new Array<PhoneUpdate>(), new Array<AddressUpdate>());
    this.statusSubmit = "";
    this.phoneNumber = "";
    this.addressAddOk = false;
    this.phonesAddOk = false;
  }

  ngOnInit(): void {
    this.getUser();
  }

  onSubmit(form: any) {
    this._userService.update(this.user, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          this.statusSubmit="failed";
          console.log("no se actualizo correctamente");
        } else {
          this._storageService.setToken(response.userToken); 
          this._storageService.setIdentity(response);
          this.statusSubmit="success";
        }
        
      },
      error: (err) => {          
        console.log(err);
        this.statusSubmit="failed";
      }
    });
  }

  getUser(){
    this._userService.getByEmail(this.getUserEmail()).subscribe(
      {
        next: (response) => {
          if (response.error) {
            console.log("usuario no encotrado");
          } else {
            this.user = response;
            console.log(response)
          }
        },
        error: (err) => {          
          console.log(err)
        }
      });
  }

  getUserEmail(): string{
    var identity = this._storageService.getIdentity();
    return identity.email;
  }

  authenticated(): boolean{
    return this._storageService.isAuthenticated();
  }
}
