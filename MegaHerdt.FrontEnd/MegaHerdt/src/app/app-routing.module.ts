import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { AuthGuardService as AuthGuard } from './services/guard/auth-guard/auth-guard.service';
import { LogoutComponent } from './components/users/logout/logout.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { RoleGuardService as RoleGuard } from './services/guard/role-guard/role-guard.service';
import { RoleEnum as Role } from './utils/RoleEnum';
import { ShowUsersComponent } from './components/users/show-users/show-users.component';
import { EditRoleUserComponent } from './components/users/edit-role-user/edit-role-user/edit-role-user.component';
import { AdministrateCategoriesComponent } from './components/categories/administrate-categories/administrate-categories.component';
import { AdministrateBrandsComponent } from './components/brands/administrate-brands/administrate-brands.component';
import { AdministrateProvidersComponent } from './components/providers/administrate-providers/administrate-providers.component';
import { AdministrateOffersComponent } from './components/offers/administrate-offers/administrate-offers.component';
import { AdministrateArticlesProvisionsComponent } from './components/articles-provisions/administrate-articles-provisions/administrate-articles-provisions.component';
import { AdministrateReparationStatesComponent } from './components/reparation-states/administrate-reparation-states/administrate-reparation-states.component';
import { ReparationRecordComponent } from './components/reparations/reparation-record/reparation-record.component';
import { CreateReparationClaimComponent } from './components/reparation-claims/create-reparation-claim/create-reparation-claim.component';
import { ShowReparationClaimsComponent } from './components/reparation-claims/show-reparation-claims/show-reparation-claims.component';
import { AnswerReparationClaimComponent } from './components/reparation-claims/answer-reparation-claim/answer-reparation-claim.component';
import { ClientReparationClaimsComponent } from './components/reparation-claims/client-reparation-claims/client-reparation-claims.component';
import { ConfirmReparationPaymentComponent } from './components/reparationPayments/confirm-reparation-payment/confirm-reparation-payment.component';
import { ConfirmPurchasePaymentComponent } from './components/purchase-payments/confirm-purchase-payment/confirm-purchase-payment.component';
import { PurchaseRecordComponent } from './components/purchases/purchase-record/purchase-record.component';
import { CreatePurchaseClaimComponent } from './components/purchase-claims/create-purchase-claim/create-purchase-claim.component';
import { ClientPurchaseClaimsComponent } from './components/purchase-claims/client-purchase-claims/client-purchase-claims.component';
import { ShowPurchaseClaimsComponent } from './components/purchase-claims/show-purchase-claims/show-purchase-claims.component';
import { AnswerPurchaseClaimsComponent } from './components/purchase-claims/answer-purchase-claims/answer-purchase-claims.component';
import { AdministrateTransportCompaniesComponent } from './components/transport-companies/administrate-transport-companies/administrate-transport-companies.component';
import { AdministratePurchasesShipmentsComponent } from './components/shipments/administrate-purchases-shipments/administrate-purchases-shipments.component';
import { AssignPurchaseShipmentComponent } from './components/shipments/assign-purchase-shipment/assign-purchase-shipment.component';
import { UserChangePasswordComponent } from './components/users/user-change-password/user-change-password.component';
import { CreateArticleComponent } from './components/articles/create-article/create-article.component';
import { EditArticlesComponent } from './components/articles/edit-articles/edit-articles.component';
import { ForgetPasswordComponent } from './components/users/forget-password/forget-password.component';
import { CreateReparationComponent } from './components/reparations/create-reparation/create-reparation.component';
import { EditReparationsComponent } from './components/reparations/edit-reparations/edit-reparations.component';
import { AdminCreateUserComponent } from './components/users/admin-create-user/admin-create-user.component';
import { ShowDebtorsComponent } from './components/debts/show-debtors/show-debtors.component';
import { ShowIncomeExpensesComponent } from './components/income-expenses/show-income-expenses/show-income-expenses.component';
import { PurchaseSuccessComponent } from './components/purchase-payments/purchase-success/purchase-success.component';
import { PurchaseFailedComponent } from './components/purchase-payments/purchase-failed/purchase-failed.component';
import { ReparationPaymentSuccessComponent } from './components/reparationPayments/reparation-payment-success/reparation-payment-success.component';
import { ReparationPaymentFailedComponent } from './components/reparationPayments/reparation-payment-failed/reparation-payment-failed.component';
import { CreateArticleProvisionComponent } from './components/articles-provisions/create-article-provision/create-article-provision.component';
import { ShowStatisticsComponent } from './components/statistics/show-statistics/show-statistics.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { type: 'default' } },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'articles/articles-by-category/:categoryId', component: HomeComponent, data: { type: 'category' }}, // Lo mando al home, para llamar al componente correspondiente
  { path: 'articles/articles-by-brand/:brandId', component: HomeComponent, data: { type: 'brand' }},      // Lo mando al home, para llamar al componente correspondiente
  { path: 'articles/articles-offers', component: HomeComponent, data: { type: 'offer' } },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuard] },
  { path: 'user/settings/update', component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: 'user/settings/change-password', component: UserChangePasswordComponent, canActivate: [AuthGuard ]},
  { path: 'reparations/record', component: ReparationRecordComponent, canActivate: [AuthGuard] },
  { path: 'reparations/record/reparation/:id/claim', component: CreateReparationClaimComponent, canActivate: [AuthGuard] },
  { path: 'reparations/record/reparation/:id/payment', component: ConfirmReparationPaymentComponent, canActivate: [AuthGuard] },
  { path: 'client-reparation-claims', component: ClientReparationClaimsComponent, canActivate: [AuthGuard] },
  { path: 'confirm-purchase', component: ConfirmPurchasePaymentComponent, canActivate: [AuthGuard] },
  { path: 'purchase-success', component: PurchaseSuccessComponent, canActivate: [AuthGuard] },
  { path: 'purchase-failed', component: PurchaseFailedComponent, canActivate: [AuthGuard] },
  { path: 'reparation-payment-success', component: ReparationPaymentSuccessComponent, canActivate: [AuthGuard] },
  { path: 'reparation-payment-failed', component: ReparationPaymentFailedComponent, canActivate: [AuthGuard] },
  { path: 'purchases/record', component: PurchaseRecordComponent, canActivate: [AuthGuard] },
  { path: 'purchases/record/purchase/:id/claim', component: CreatePurchaseClaimComponent, canActivate: [AuthGuard] },
  { path: 'client-purchase-claims', component: ClientPurchaseClaimsComponent, canActivate: [AuthGuard] },

  //EMPLOYEE AND ADMIN ROUTES
  { 
    path: 'administrate/administrate-categories', component: AdministrateCategoriesComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-brands', component: AdministrateBrandsComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-providers', component: AdministrateProvidersComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-articles/create', component: CreateArticleComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-articles/edit', component: EditArticlesComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-offers', component: AdministrateOffersComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-provisions', component: AdministrateArticlesProvisionsComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/create-provisions', component: CreateArticleProvisionComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-reparation-states', component: AdministrateReparationStatesComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-reparations/create', component: CreateReparationComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-reparations/edit/:state', 
      component: EditReparationsComponent, 
      canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }
  },
  { 
    path: 'administrate/show-reparation-claims', component: ShowReparationClaimsComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/show-reparation-claims/answer-reparation-claim/:idReparationClaim', component: AnswerReparationClaimComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/show-purchase-claims', component: ShowPurchaseClaimsComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/show-purchase-claims/answer-purchase-claim/:idPurchaseClaim', component: AnswerPurchaseClaimsComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-transport-companies', component: AdministrateTransportCompaniesComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-purchases-shipments/:state',
    component: AdministratePurchasesShipmentsComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/administrate-purchases-shipments/purchase/:purchaseId/assign-shipment', component: AssignPurchaseShipmentComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/show-debtors', component: ShowDebtorsComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/show-income-expenses', component: ShowIncomeExpensesComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  { 
    path: 'administrate/show-statistics', component: ShowStatisticsComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  //ADMIN ROUTES
  { 
    path: 'administrate/show-users', component: ShowUsersComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN ] }  
  },
  { 
    path: 'administrate/show-users/create-user', component: AdminCreateUserComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN ] }  
  },
  { 
    path: 'administrate/show-users/edit-role-user/:userName', component: EditRoleUserComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN ] }  
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
