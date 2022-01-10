import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _storageService: StorageService, private _router: Router) { }

  ngOnInit(): void {
    this._storageService.logout();
    this._router.navigate(['login']);
  }

}
