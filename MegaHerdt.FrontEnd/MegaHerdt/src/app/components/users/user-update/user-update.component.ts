import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressUpdate } from 'src/app/models/Address/AddressUpdate';
import { PhoneUpdate } from 'src/app/models/Phone/PhoneUpdate';
import { UserUpdate } from 'src/app/models/User/UserUpdate';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})

export class UserUpdateComponent implements OnInit {
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
          this._storageService.setTokenCredentials(response.userToken); 
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

  removePhone(index: number) {
    this.user.phones.splice(index, 1);
  }

  numberEmpty(): boolean {
    return this.phoneNumber == "";
  }

  addPhone() {
    var phone = new PhoneUpdate(0,this.phoneNumber);
    this.user.phones.push(phone);
    this.phoneNumber = "";
    this.phonesAddOk = true;
  }

  addAddress(address: any) {
    this.user.addresses.push(address);
    this.addressAddOk = true;
  }

  removeAddress(index: number){
    this.user.addresses.splice(index, 1);
  }

}
