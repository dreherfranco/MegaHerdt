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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuard] },
  { path: 'user/settings', component: UserSettingsComponent, canActivate: [AuthGuard ] },
  { path: 'user/settings/update', component: UserUpdateComponent, canActivate: [AuthGuard] },
  
  //ADMIN ROUTES
  { 
    path: 'administrate', component: AdministrateComponent, canActivate: [AuthGuard, RoleGuard], 
      data: { expectedsRoles: [ Role.ADMIN ] }  
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
