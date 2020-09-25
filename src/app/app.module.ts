import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { UserService } from './services/user.service';
import { UtilsService } from './services/utils.service';
import { SearchContactsPipe } from './pipes/search-contacts.pipe';

import { AuthenticationGuard } from './guards/authentication.guard';
import { LoggedInGuard } from './guards/loggedin.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavLandingPageComponent } from './nav-landing-page/nav-landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { SiderComponent } from './sider/sider.component';

registerLocaleData(en);

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavLandingPageComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    ContactsComponent,
    ContactAddComponent,
    CompaniesComponent,
    CompanyAddComponent,
    ContactEditComponent,
    ContactViewComponent,
    SiderComponent,
    SearchContactsPipe
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FullCalendarModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    UtilsService,
    AuthenticationGuard,
    LoggedInGuard,
    SearchContactsPipe,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
