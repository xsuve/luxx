import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInLoading: boolean = false;

  logInForm: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'The email is required.' },
      { type: 'email', message: 'Enter a valid email address.' }
    ],
    'alert': { type: '', message: '' }
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Submit Log In
  submitLogIn(value) {
    this.logInLoading = true;
    this.userService.getUserByEmail(value.email).subscribe(res => {
      if(res) {
        if(res.verified) {
          this.userService.logInUser(value.email).subscribe(res => {
            // Reset Fields
            this.logInForm = this.fb.group({
              email: new FormControl('', [Validators.required, Validators.email])
            });

            this.validation_messages.alert = {
              type: 'success',
              message: 'The login link has been sent to your email address.'
            };

            this.logInLoading = false;
          });
        } else {
          this.validation_messages.alert = {
            type: 'error',
            message: 'This account has not been verified yet.'
          };
        }
      } else {
        this.validation_messages.alert = {
          type: 'error',
          message: 'This email has not been registered on the platform.'
        };
      }
    });
  }

}
