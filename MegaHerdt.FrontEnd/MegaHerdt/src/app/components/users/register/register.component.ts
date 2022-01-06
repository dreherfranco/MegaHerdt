import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup ;
  phoneNumber: string;

  constructor(private fb: FormBuilder) {
    this.phoneNumber= "";
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        password: new FormControl('', Validators.required),
        phones: new FormArray([]),
        phoneNumber: new FormControl(this.phoneNumber)
      });
   }

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.userForm.value);
  }

 get phones(): FormArray {
    return this.userForm.get('phones') as FormArray;
  }

  addPhone(phoneNumber:string) {
    const phone = new FormControl(phoneNumber);
    (<FormArray>this.userForm.get('phones')).push(phone);
  }
}
