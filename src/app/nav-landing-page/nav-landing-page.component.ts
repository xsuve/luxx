import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../services/utils.service';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-landing-page',
  templateUrl: './nav-landing-page.component.html',
  styleUrls: ['./nav-landing-page.component.css']
})
export class NavLandingPageComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: User;

  constructor(
    private utilsService: UtilsService,
    private userService: UserService
  ) {
    this.isLoggedIn = this.userService.isLoggedIn();

    if(this.isLoggedIn) {
      this.loggedInUser = this.userService.getLoggedInUser();
    }
  }

  ngOnInit() {
  }

}
