import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxStripeModule } from 'ngx-stripe';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import { NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSortModule} from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
import { CreateArticleComponent } from './components/articles/create-article/create-article.component';
import { EditArticlesComponent } from './components/articles/edit-articles/edit-articles.component';
import { EditArticleComponent } from './components/articles/edit-articles/edit-article/edit-article.component';
import { DialogUpdateArticleComponent } from './components/articles/edit-articles/dialog-update-article/dialog-update-article.component';
import { AdministrateOffersComponent } from './components/offers/administrate-offers/administrate-offers.component';
import { CreateOfferComponent } from './components/offers/create-offer/create-offer.component';
import { EditOffersComponent } from './components/offers/edit-offers/edit-offers.component';
import { DialogUpdateOfferComponent } from './components/offers/edit-offers/dialog-update-offer/dialog-update-offer.component';
import { AdministrateArticlesProvisionsComponent } from './components/articles-provisions/administrate-articles-provisions/administrate-articles-provisions.component';
import { CreateArticleProvisionComponent } from './components/articles-provisions/create-article-provision/create-article-provision.component';
import { EditArticlesProvisionsComponent } from './components/articles-provisions/edit-articles-provisions/edit-articles-provisions.component';
import { DialogUpdateArticleProvisionComponent } from './components/articles-provisions/edit-articles-provisions/dialog-update-article-provision/dialog-update-article-provision.component';
import { AdministrateReparationStatesComponent } from './components/reparation-states/administrate-reparation-states/administrate-reparation-states.component';
import { CreateReparationStatesComponent } from './components/reparation-states/create-reparation-states/create-reparation-states.component';
import { EditReparationStatesComponent } from './components/reparation-states/edit-reparation-states/edit-reparation-states.component';
import { DialogUpdateReparationStateComponent } from './components/reparation-states/edit-reparation-states/dialog-update-reparation-state/dialog-update-reparation-state.component';
import { AdministrateReparationsComponent } from './components/reparations/administrate-reparations/administrate-reparations.component';
import { CreateReparationComponent } from './components/reparations/create-reparation/create-reparation.component';
import { EditReparationsComponent } from './components/reparations/edit-reparations/edit-reparations.component';
import { DialogUpdateReparationComponent } from './components/reparations/edit-reparations/dialog-update-reparation/dialog-update-reparation.component';
import { ReparationRecordComponent } from './components/reparations/reparation-record/reparation-record.component';
import { DialogDeleteProfileComponent } from './components/users/user-settings/dialog-delete-profile/dialog-delete-profile.component';
import { CreateReparationClaimComponent } from './components/reparation-claims/create-reparation-claim/create-reparation-claim.component';
import { ShowReparationClaimsComponent } from './components/reparation-claims/show-reparation-claims/show-reparation-claims.component';
import { AnswerReparationClaimComponent } from './components/reparation-claims/answer-reparation-claim/answer-reparation-claim.component';
import { ClientReparationClaimsComponent } from './components/reparation-claims/client-reparation-claims/client-reparation-claims.component';
import { DialogShowReparationDetailComponent } from './components/reparations/dialog-show-reparation-detail/dialog-show-reparation-detail.component';
import { ConfirmReparationPaymentComponent } from './components/reparationPayments/confirm-reparation-payment/confirm-reparation-payment.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { ConfirmPurchasePaymentComponent } from './components/purchase-payments/confirm-purchase-payment/confirm-purchase-payment.component';
import { CartDetailComponent } from './components/cart/cart-detail/cart-detail.component';
import { PurchaseRecordComponent } from './components/purchases/purchase-record/purchase-record.component';
import { CreatePurchaseClaimComponent } from './components/purchase-claims/create-purchase-claim/create-purchase-claim.component';
import { ClientPurchaseClaimsComponent } from './components/purchase-claims/client-purchase-claims/client-purchase-claims.component';
import { DialogShowPurchaseDetailComponent } from './components/purchases/dialog-show-purchase-detail/dialog-show-purchase-detail.component';
import { ShowPurchaseClaimsComponent } from './components/purchase-claims/show-purchase-claims/show-purchase-claims.component';
import { AnswerPurchaseClaimsComponent } from './components/purchase-claims/answer-purchase-claims/answer-purchase-claims.component';
import { CreateTransportCompanyComponent } from './components/transport-companies/create-transport-company/create-transport-company.component';
import { EditTransportCompaniesComponent } from './components/transport-companies/edit-transport-companies/edit-transport-companies.component';
import { AdministrateTransportCompaniesComponent } from './components/transport-companies/administrate-transport-companies/administrate-transport-companies.component';
import { DialogUpdateTransportCompanyComponent } from './components/transport-companies/edit-transport-companies/dialog-update-transport-company/dialog-update-transport-company.component';
import { ShowAllPurchasesComponent } from './components/purchases/show-all-purchases/show-all-purchases.component';
import { AdministratePurchasesShipmentsComponent } from './components/shipments/administrate-purchases-shipments/administrate-purchases-shipments.component';
import { AssignPurchaseShipmentComponent } from './components/shipments/assign-purchase-shipment/assign-purchase-shipment.component';
import { UserChangePasswordComponent } from './components/users/user-change-password/user-change-password.component';
import { DialogConfirmDeleteComponent } from './components/general/dialog-confirm-delete/dialog-confirm-delete.component';
import { ForgetPasswordComponent } from './components/users/forget-password/forget-password.component';
import { DialogCreateBrandComponent } from './components/brands/create-brand/dialog-create-brand/dialog-create-brand.component';
import { DialogCreateCategoryComponent } from './components/categories/create-category/dialog-create-category/dialog-create-category.component';
import { CategoryGraphicComponent } from './components/categories/category-graphic/category-graphic.component';
import { BrandGraphicComponent } from './components/brands/brand-graphic/brand-graphic.component';
import { DialogRegisterSuccessComponent } from './components/users/register/dialog-register-success/dialog-register-success.component';

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
    CreateArticleComponent,
    EditArticlesComponent,
    EditArticleComponent,
    DialogUpdateArticleComponent,
    AdministrateOffersComponent,
    CreateOfferComponent,
    EditOffersComponent,
    DialogUpdateOfferComponent,
    AdministrateArticlesProvisionsComponent,
    CreateArticleProvisionComponent,
    EditArticlesProvisionsComponent,
    DialogUpdateArticleProvisionComponent,
    AdministrateReparationStatesComponent,
    CreateReparationStatesComponent,
    EditReparationStatesComponent,
    DialogUpdateReparationStateComponent,
    AdministrateReparationsComponent,
    CreateReparationComponent,
    EditReparationsComponent,
    DialogUpdateReparationComponent,
    ReparationRecordComponent,
    DialogDeleteProfileComponent,
    CreateReparationClaimComponent,
    ShowReparationClaimsComponent,
    AnswerReparationClaimComponent,
    ClientReparationClaimsComponent,
    DialogShowReparationDetailComponent,
    ConfirmReparationPaymentComponent,
    CartComponent,
    CartItemComponent,
    ConfirmPurchasePaymentComponent,
    CartDetailComponent,
    PurchaseRecordComponent,
    CreatePurchaseClaimComponent,
    ClientPurchaseClaimsComponent,
    DialogShowPurchaseDetailComponent,
    ShowPurchaseClaimsComponent,
    AnswerPurchaseClaimsComponent,
    CreateTransportCompanyComponent,
    EditTransportCompaniesComponent,
    AdministrateTransportCompaniesComponent,
    DialogUpdateTransportCompanyComponent,
    ShowAllPurchasesComponent,
    AdministratePurchasesShipmentsComponent,
    AssignPurchaseShipmentComponent,
    UserChangePasswordComponent,
    DialogConfirmDeleteComponent,
    ForgetPasswordComponent,
    DialogCreateBrandComponent,
    DialogCreateCategoryComponent,
    CategoryGraphicComponent,
    BrandGraphicComponent,
    DialogRegisterSuccessComponent,
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
    BsDropdownModule,
    AlertModule,
    ColorPickerModule,
    NgChartsModule,
    MatSortModule,
    MatAutocompleteModule,
    NgxStripeModule.forRoot('pk_test_51KOsMMLFz3iBJKgrLLDZC0HmvofwUbENMgupBtCnJ4Yo21bINMHBolzgbdg6lTB5bO3D9l9J6axnZUx6tE0nPHgD00yKyQXAax'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
