import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { UtilsService } from '../services/utils.service';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: User;

  pageHeader: string = 'Dashboard';

  constructor(
    private translate: TranslateService,
    private utilsService: UtilsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isLoggedIn = this.userService.isLoggedIn();

    if(this.isLoggedIn) {
      this.loggedInUser = this.userService.getLoggedInUser();
    }
  }

  ngOnInit() {
    switch(this.router.url) {
      case '/dashboard':
        this.translate.get('dashboard').subscribe(res => {
          this.pageHeader = res;
        });
      break;

      case '/contacts':
        this.translate.get('contacts').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/contacts/add':
        this.translate.get('add_contact').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/contact/edit/' + this.route.snapshot.paramMap.get('id'):
        this.translate.get('edit_contact').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/contact/' + this.route.snapshot.paramMap.get('id'):
        this.translate.get('view_contact').subscribe(res => {
          this.pageHeader = res;
        });
      break;

      case '/companies':
        this.translate.get('companies').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/companies/add':
        this.translate.get('add_company').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/company/edit/' + this.route.snapshot.paramMap.get('id'):
        this.translate.get('edit_company').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/company/' + this.route.snapshot.paramMap.get('id'):
        this.translate.get('view_company').subscribe(res => {
          this.pageHeader = res;
        });
      break;

      case '/pipelines':
        this.translate.get('pipelines').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/pipelines/add':
        this.translate.get('add_pipeline').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/pipeline/edit/' + this.route.snapshot.paramMap.get('id'):
        this.translate.get('edit_pipeline').subscribe(res => {
          this.pageHeader = res;
        });
      break;
      case '/pipeline/' + this.route.snapshot.paramMap.get('id'):
        this.translate.get('view_pipeline').subscribe(res => {
          this.pageHeader = res;
        });
      break;

      case '/settings':
        this.translate.get('settings').subscribe(res => {
          this.pageHeader = res;
        });
      break;

      default:
        this.translate.get('dashboard').subscribe(res => {
          this.pageHeader = res;
        });
      break;
    }
  }

  // Log Out
  logOut() {
    this.userService.logOutUser();
  }

}
