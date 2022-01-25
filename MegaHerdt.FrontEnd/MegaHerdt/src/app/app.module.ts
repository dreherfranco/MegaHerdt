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
import { AdministrateProvidersComponent } from './components/providers/administrate-providers/administrate-providers.component';
import { CreateProviderComponent } from './components/providers/create-provider/create-provider.component';
import { EditProvidersComponent } from './components/providers/edit-providers/edit-providers.component';
import { DialogUpdateProviderComponent } from './components/providers/edit-providers/dialog-update-provider/dialog-update-provider.component';
import { AdministrateArticlesComponent } from './components/articles/administrate-articles/administrate-articles.component';
import { CreateArticleComponent } from './components/articles/create-article/create-article.component';
import { EditArticlesComponent } from './components/articles/edit-articles/edit-articles.component';
import { EditArticleComponent } from './components/articles/edit-articles/edit-article/edit-article.component';
import { DialogUpdateArticleComponent } from './components/articles/edit-articles/dialog-update-article/dialog-update-article.component';
import { AdministrateOffersComponent } from './components/offers/administrate-offers/administrate-offers.component';
import { CreateOfferComponent } from './components/offers/create-offer/create-offer.component';
import { EditOffersComponent } from './components/offers/edit-offers/edit-offers.component';
import { DialogUpdateOfferComponent } from './components/offers/edit-offers/dialog-update-offer/dialog-update-offer.component';

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
    DialogUpdateBrandComponent,
    AdministrateProvidersComponent,
    CreateProviderComponent,
    EditProvidersComponent,
    DialogUpdateProviderComponent,
    AdministrateArticlesComponent,
    CreateArticleComponent,
    EditArticlesComponent,
    EditArticleComponent,
    DialogUpdateArticleComponent,
    AdministrateOffersComponent,
    CreateOfferComponent,
    EditOffersComponent,
    DialogUpdateOfferComponent
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
    MatDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
