import { Component, OnInit } from '@angular/core';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';
import { AddressUpdate } from 'src/app/models/Address/AddressUpdate';
import { PhoneCreation } from 'src/app/models/Phone/PhoneCreation';
import { PhoneUpdate } from 'src/app/models/Phone/PhoneUpdate';
import { UserUpdate } from 'src/app/models/User/UserUpdate';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})

export class UserUpdateComponent implements OnInit {
  user: UserUpdate;
  phoneNumber: string;
  newAddress = new AddressCreation('', 0, '', 0, '', '', '');
  newPhoneAdded: boolean = false;
  newAddressAdded: boolean = false;
  error: string = '';

  constructor(private _userService: UserService,
    private _storageService: StorageService) {
    this.user = new UserUpdate('', '', '', '', '', new Array<PhoneUpdate>(), new Array<AddressUpdate>());
    this.phoneNumber = "";

  }

  ngOnInit(): void {
    this.getUser();
  }

  isValidAddress(): boolean {
    let address = this.user.addresses[0];
    return address.department !== '' && address.postalCode !== 0 && address.streetName !== '' &&
      address.streetNumber !== 0 && address.townName !== '';
  }

  isValidPhone(): boolean {
    return this.user.phones[0].number !== '';
  }

  addNewAddress(){
    let addressUpdate = new AddressUpdate(0, this.newAddress.streetName,
      this.newAddress.streetNumber, this.newAddress.department,
      this.newAddress.postalCode, this.newAddress.province,
      this.newAddress.townName, this.newAddress.floor)    
    this.newAddressAdded = true;
    this.user.addresses.push(addressUpdate);
  }

  addNewPhone(){
    let phoneUpdate = new PhoneUpdate(0,this.phoneNumber);
    this.newPhoneAdded = true;
    this.user.phones.push(phoneUpdate);
  }

  onSubmit(form: any) {
    if (this.user.addresses.length == 0) {
      this.addNewAddress();
    }

    if (this.user.phones.length == 0) {
      this.addNewPhone();
    }

    let addressOk = this.isValidAddress();
    let phoneOk = this.isValidPhone();

    if(!addressOk && this.user.addresses.length == 1){
      this.user.addresses = [];
      AlertService.errorAlert('¡Direccion incorrecta!','Ingrese una direccion valida');
    }

    if(!phoneOk && this.user.phones.length == 1){
      this.user.phones = [];
      AlertService.errorAlert('¡Telefono incorrecto!','Ingrese un telefono valido');
    }

    if (addressOk && phoneOk && this.user.addresses.length > 0 && this.user.phones.length > 0){

      this._userService.update(this.user, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error!','Error al intentar actualizar sus datos');
          } else {
            this._storageService.setTokenCredentials(response.userToken);
            this._storageService.setIdentity(response);
            AlertService.successAlert('¡Actualizado!','Datos actualizados correctamente');
          }

        },
        error: (err) => {
          console.log(err);
          this.error = err.error.message;
          AlertService.errorAlert('¡Error!', this.error);
        }
      });
    }
  }

  getUser() {
    this._userService.getByUserName(this.getUserName()).subscribe(
      {
        next: (response) => {
          if (response.error) {
            console.log("usuario no encontrado");
          } else {
            this.user = response;
          }
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  getUserName(): string {
    var identity = this._storageService.getIdentity();
    return identity.userName;
  }

  authenticated(): boolean {
    return this._storageService.isAuthenticated();
  }

  removePhone(index: number) {
    this.user.phones.splice(index, 1);
  }

  numberEmpty(): boolean {
    return this.phoneNumber == "";
  }

  removeAddress(index: number) {
    this.user.addresses.splice(index, 1);
  }

  phoneAlert() {
    AlertService.warningAlertAdvice('Ingrese al menos un telefono');
  }

  addressAlert() {
    AlertService.warningAlertAdvice('Ingrese al menos una direccion');
  }

  passwordAlert() {
    AlertService.warningAlertAdvice('Ingrese su contraseña antes de actualizar');
  }
}
