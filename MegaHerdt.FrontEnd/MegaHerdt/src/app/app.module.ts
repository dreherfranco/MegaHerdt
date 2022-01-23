import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { ArticleItemComponent } from './components/articles/article-item/article-item.component';
import { RegisterComponent } from './components/users/register/register.component';
import { AddressCreationComponent } from './components/address/address-creation/address-creation.component';
import { AddressDetailComponent } from './components/address/address-detail/address-detail.component';
import { LoginComponent } from './components/users/login/login.component';
import { LogoutComponent } from './components/users/logout/logout.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { AddressUpdateComponent } from './components/address/address-update/address-update.component';
import { PhoneUpdateComponent } from './components/phones/phone-update/phone-update.component';
import { UserSettingsComponent } from './components/users/user-settings/user-settings.component';
import { AdministrateComponent } from './components/administrate/administrate/administrate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowUsersComponent } from './components/users/show-users/show-users.component';
import { UserDetailAdministrateComponent } from './components/users/user-detail-administrate/user-detail-administrate.component';
import { EditRoleUserComponent } from './components/users/edit-role-user/edit-role-user/edit-role-user.component';
import { RolesUserComponent } from './components/roles/roles-user/roles-user/roles-user.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdministrateCategoriesComponent } from './components/categories/administrate-categories/administrate-categories.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { EditCategoriesComponent } from './components/categories/edit-categories/edit-categories.component';
import { DialogUpdateCategoryComponent } from './components/categories/edit-categories/dialog-update-category/dialog-update-category.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateBrandComponent } from './components/brands/create-brand/create-brand.component';
import { AdministrateBrandsComponent } from './components/brands/administrate-brands/administrate-brands.component';
import { EditBrandsComponent } from './components/brands/edit-brands/edit-brands.component';
import { DialogUpdateBrandComponent } from './components/brands/edit-brands/dialog-update-brand/dialog-update-brand.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ArticleListComponent,
    ArticleItemComponent,
    RegisterComponent,
    AddressCreationComponent,
    AddressDetailComponent,
    LoginComponent,
    LogoutComponent,
    UserUpdateComponent,
    AddressUpdateComponent,
    PhoneUpdateComponent,
    UserSettingsComponent,
    AdministrateComponent,
    ShowUsersComponent,
    UserDetailAdministrateComponent,
    EditRoleUserComponent,
    RolesUserComponent,
    AdministrateCategoriesComponent,
    CreateCategoryComponent,
    EditCategoriesComponent,
    DialogUpdateCategoryComponent,
    CreateBrandComponent,
    AdministrateBrandsComponent,
    EditBrandsComponent,
    DialogUpdateBrandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
