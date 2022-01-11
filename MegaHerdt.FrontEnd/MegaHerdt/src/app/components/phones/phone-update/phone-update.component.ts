import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { PhoneUpdate } from 'src/app/models/Phone/PhoneUpdate';

@Component({
  selector: 'app-phone-update',
  templateUrl: './phone-update.component.html',
  styleUrls: ['./phone-update.component.css']
})
export class PhoneUpdateComponent implements OnInit {
  @Input() phone: PhoneUpdate;

  constructor() {
    this.phone = new PhoneUpdate(0,'');
   }

  ngOnInit(): void {
  }

}
