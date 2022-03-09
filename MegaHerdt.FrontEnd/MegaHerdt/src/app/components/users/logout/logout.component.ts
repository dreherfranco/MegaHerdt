import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _storageService: StorageService, private _router: Router, private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.emptyCart();
    this._storageService.logout();
    this._router.navigate(['login']);
  }

}
