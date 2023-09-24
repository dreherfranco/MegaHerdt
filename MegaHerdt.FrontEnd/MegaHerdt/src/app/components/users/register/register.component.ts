import { Component, OnInit } from '@angular/core';
import { UserCreate } from '../../../models/User/UserCreate';
import { PhoneCreation } from '../../../models/Phone/PhoneCreation';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogRegisterSuccessComponent } from './dialog-register-success/dialog-register-success.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserCreate;
  error: string = '';

  constructor(private _userService: UserService, private _router: Router,
    private _storageService: StorageService, public dialog: MatDialog) {
    this.user = new UserCreate('', '', '', '', '', new Array<PhoneCreation>(), new Array<AddressCreation>());
    this.user.addresses.push(new AddressCreation('', 0, '', 0, '', '', ''));
    this.user.phones.push(new PhoneCreation(''));
  }

  ngOnInit(): void {
  }

  isValidAddress(): boolean {
    let address = this.user.addresses[0];
    return address.department !== '' 
      && address.postalCode !== 0 && address.postalCode.toString() !== '' 
      && address.streetName !== '' 
      && address.streetNumber !== 0 && address.streetNumber.toString() !== '' 
      && address.townName !== '';
  }

  isValidPhone(): boolean{
    return this.user.phones[0].number != '';
  }

  onSubmit(form: any) {
    let addressOk = this.isValidAddress();
    let phoneOk = this.isValidPhone();
    console.log(this.user.addresses[0])
    if(!phoneOk){
      AlertService.errorAlert('¡Telefono incorrecto!','Ingrese un telefono valido');
    }

    if(!addressOk){
      AlertService.errorAlert('¡Direccion incorrecta!','Ingrese una direccion valida');
    }

    if (addressOk && phoneOk) {
      this.user.userName = this.user.email;
      this._userService.register(this.user).subscribe(
        {
          next: (response) => {
            if (response.error) {
              AlertService.errorAlert('¡Error!','Error al intentar registrarse');
            } else {
              //this.openDialogRegisterSuccess();
              
              AlertService.successAlert('¡Registro exitoso!','Usted se ha registrado satisfactoriamente')
              .then((result) => {
                this._router.navigate(['/login']);
              });
            }
          },
          error: (err) => {           
            this.error = err.error.message;
            if(this.error === '' || this.error === null) {
              this.error = 'Controle los datos obligatorios correspondientes a la dirección';
            }
            AlertService.errorAlert('¡Error!', this.error);
            console.log(err)
          }
        }
      );
    }
  }

  /*openDialogRegisterSuccess(){
    const dialogRef = this.dialog.open(DialogRegisterSuccessComponent,
      {
        disableClose:true,
      });
  }*/

  authenticated(): boolean {
    return this._storageService.isAuthenticated();
  }

  phoneAlert() {
    AlertService.warningAlertAdvice('Ingrese al menos un telefono');
  }

  addressAlert() {
    AlertService.warningAlertAdvice('Ingrese al menos una direccion');
  }
}
