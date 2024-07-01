import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { RoleEnum as Role} from 'src/app/utils/RoleEnum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userAuthenticated: UserDetail = new UserDetail('','','','','',[]);
  categories: Category[] = [];
  brands: Brand[] = [];
  cart: string | null = null;

  constructor(private _storageService: StorageService, 
    private _brandService: BrandService,
    private _categoryService: CategoryService) 
  { 
  }

  cartByLocal(){
    return localStorage.getItem('cart');   
  }

  ngOnInit(): void {
    this._storageService.identityObserver.subscribe({
      next: (res) =>{
        this.userAuthenticated = res;
      }
    });
    
    this.loadCategories();
    this.loadBrands();
  }

  loadCategories(){
    this._categoryService.getAll().subscribe({next: response => this.categories = response});
  }

  loadBrands(){
    this._brandService.getAll().subscribe({next: response => this.brands = response});
  }

  authenticated(): boolean{
    return this._storageService.isAuthenticated();
  }

  isEmployeeOrAdmin(): boolean{
    let expectedsRoles = new Array<string>();
    expectedsRoles.push(Role.ADMIN, Role.EMPLEADO);
    return this._storageService.areExpectedRoles(expectedsRoles);
  }

  isAdmin(): boolean{
    let expectedsRoles = new Array<string>();
    expectedsRoles.push(Role.ADMIN);
    return this._storageService.areExpectedRoles(expectedsRoles);
  }
}
