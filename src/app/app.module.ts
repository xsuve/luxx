import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler, ScrollDispatcher } from '@angular/cdk/scrolling';
import { DragDropModule, DragDropRegistry } from '@angular/cdk/drag-drop';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

import { UserService } from './services/user.service';

import { AuthenticationGuard } from './guards/authentication.guard';
import { LoggedInGuard } from './guards/loggedin.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavLandingPageComponent } from './nav-landing-page/nav-landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SiderComponent } from './sider/sider.component';
import { NavComponent } from './nav/nav.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { SearchContactsPipe } from './pipes/search-contacts.pipe';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyViewComponent } from './company-view/company-view.component';
import { PipelinesComponent } from './pipelines/pipelines.component';
import { PipelineAddComponent } from './pipeline-add/pipeline-add.component';
import { PipelineViewComponent } from './pipeline-view/pipeline-view.component';
import { SettingsComponent } from './settings/settings.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContactsComponent,
    LandingPageComponent,
    NavLandingPageComponent,
    LoginComponent,
    SignupComponent,
    SiderComponent,
    NavComponent,
    ContactAddComponent,
    ContactViewComponent,
    ContactEditComponent,
    SearchContactsPipe,
    CompaniesComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    CompanyViewComponent,
    PipelinesComponent,
    PipelineAddComponent,
    PipelineViewComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FullCalendarModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    AuthenticationGuard,
    LoggedInGuard,
    Platform,
    ViewportRuler,
    DragDropRegistry,
    ScrollDispatcher,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
