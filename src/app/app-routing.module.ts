import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyAddComponent } from './company-add/company-add.component';

import { AuthenticationGuard } from './guards/authentication.guard';
import { LoggedInGuard } from './guards/loggedin.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signup', pathMatch: 'full', component: SignupComponent, canActivate: [LoggedInGuard] },
  { path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'contacts', pathMatch: 'full', component: ContactsComponent, canActivate: [AuthenticationGuard] },
  { path: 'contacts/add', pathMatch: 'full', component: ContactAddComponent, canActivate: [AuthenticationGuard] },
  { path: 'contacts/edit/:id', pathMatch: 'full', component: ContactEditComponent, canActivate: [AuthenticationGuard] },
  { path: 'contact/:id', pathMatch: 'full', component: ContactViewComponent, canActivate: [AuthenticationGuard] },
  { path: 'companies', pathMatch: 'full', component: CompaniesComponent, canActivate: [AuthenticationGuard] },
  { path: 'companies/add', pathMatch: 'full', component: CompanyAddComponent, canActivate: [AuthenticationGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
