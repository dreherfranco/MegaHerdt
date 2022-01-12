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
    AdministrateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
