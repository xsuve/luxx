import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
        this.pageHeader = 'Dashboard';
      break;

      case '/contacts':
        this.pageHeader = 'Contacts';
      break;
      case '/contacts/add':
        this.pageHeader = 'Add Contact';
      break;
      case '/contact/edit/' + this.route.snapshot.paramMap.get('id'):
        this.pageHeader = 'Edit Contact';
      break;
      case '/contact/' + this.route.snapshot.paramMap.get('id'):
        this.pageHeader = 'View Contact';
      break;

      case '/companies':
        this.pageHeader = 'Companies';
      break;
      case '/companies/add':
        this.pageHeader = 'Add Company';
      break;
      case '/company/edit/' + this.route.snapshot.paramMap.get('id'):
        this.pageHeader = 'Edit Company';
      break;
      case '/company/' + this.route.snapshot.paramMap.get('id'):
        this.pageHeader = 'View Company';
      break;

      case '/pipelines':
        this.pageHeader = 'Pipelines';
      break;
      case '/pipelines/add':
        this.pageHeader = 'Add Pipeline';
      break;
      case '/pipeline/edit/' + this.route.snapshot.paramMap.get('id'):
        this.pageHeader = 'Edit Pipeline';
      break;
      case '/pipeline/' + this.route.snapshot.paramMap.get('id'):
        this.pageHeader = 'View Pipeline';
      break;

      case '/settings':
        this.pageHeader = 'Settings';
      break;

      default:
        this.pageHeader = 'Dashboard';
      break;
    }
  }

  // Log Out
  logOut() {
    this.userService.logOutUser();
  }

}
