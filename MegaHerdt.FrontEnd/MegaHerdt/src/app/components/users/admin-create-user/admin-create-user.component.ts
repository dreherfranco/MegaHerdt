import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';
import { PhoneCreation } from 'src/app/models/Phone/PhoneCreation';
import { UserCreate } from 'src/app/models/User/UserCreate';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.css']
})
export class AdminCreateUserComponent implements OnInit {
  user: UserCreate;
  statusSubmit: String;
  phoneOk: boolean = true;
  error: string = '';

  constructor(private _userService: UserService, private _router: Router,
    private _storageService: StorageService) {
    this.user = new UserCreate('', '', '', '', '', new Array<PhoneCreation>(), new Array<AddressCreation>());
    this.user.phones.push(new PhoneCreation(''));
    this.user.addresses.push(new AddressCreation('name',5,'Diamante',3105,'Entre Rios','Diamante',''));
    this.statusSubmit = "";
  }

  ngOnInit(): void {
  }

  isValidPhone(): boolean{
    return this.user.phones[0].number != '';
  }

  onSubmit(form: any) {
    this.phoneOk = this.isValidPhone();
    if (this.phoneOk) {
      this._userService.register(this.user).subscribe(
        {
          next: (response) => {
            if (response.error) {
              this.statusSubmit = "failed";
            } else {
              this.statusSubmit = "success";
              Swal.fire({
                title: 'Usuario creado correctamente',
                icon: 'success',
                confirmButtonText: 'OK',
                backdrop: `rgba(0, 0,125, 0.37)`,
              }).then((result) => {
                if (result.isConfirmed) {                
                  this._router.navigate(['/administrate/show-users']);
                }
              });
             // form.reset();
            }
          },
          error: (err) => {
            this.statusSubmit = "failed";
            this.error = err.error.message;
            Swal.fire({
              icon: 'error',
              title: 'Error al crear el usuario',
              text: this.error,
              backdrop: `rgba(0, 0,125, 0.37)`,
            });
            console.log(err)
          }
        }
      );
    }
  }

}
