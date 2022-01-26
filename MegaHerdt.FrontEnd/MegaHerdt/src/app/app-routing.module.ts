import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { AuthGuardService as AuthGuard } from './services/guard/auth-guard/auth-guard.service';
import { LogoutComponent } from './components/users/logout/logout.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { UserSettingsComponent } from './components/users/user-settings/user-settings.component';
import { RoleGuardService as RoleGuard } from './services/guard/role-guard/role-guard.service';
import { RoleEnum as Role } from './utils/RoleEnum';
import { AdministrateComponent } from './components/administrate/administrate/administrate.component';
import { ShowUsersComponent } from './components/users/show-users/show-users.component';
import { EditRoleUserComponent } from './components/users/edit-role-user/edit-role-user/edit-role-user.component';
import { AdministrateCategoriesComponent } from './components/categories/administrate-categories/administrate-categories.component';
import { AdministrateBrandsComponent } from './components/brands/administrate-brands/administrate-brands.component';
import { AdministrateProvidersComponent } from './components/providers/administrate-providers/administrate-providers.component';
import { AdministrateArticlesComponent } from './components/articles/administrate-articles/administrate-articles.component';
import { AdministrateOffersComponent } from './components/offers/administrate-offers/administrate-offers.component';
import { AdministrateArticlesProvisionsComponent } from './components/articles-provisions/administrate-articles-provisions/administrate-articles-provisions.component';
import { AdministrateReparationStatesComponent } from './components/reparation-states/administrate-reparation-states/administrate-reparation-states.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuard] },
  { path: 'user/settings', component: UserSettingsComponent, canActivate: [AuthGuard ]},
  { path: 'user/settings/update', component: UserUpdateComponent, canActivate: [AuthGuard] },
  
  //EMPLOYEE AND ADMIN ROUTES
  { 
    path: 'administrate', component: AdministrateComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
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
    path: 'administrate/administrate-articles', component: AdministrateArticlesComponent, canActivate: [AuthGuard, RoleGuard], 
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
    path: 'administrate/administrate-reparation-states', component: AdministrateReparationStatesComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN, Role.EMPLEADO ] }  
  },
  //ADMIN ROUTES
  { 
    path: 'administrate/show-users', component: ShowUsersComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN ] }  
  },
  { 
    path: 'administrate/show-users/edit-role-user/:email', component: EditRoleUserComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN ] }  
  },
  
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
