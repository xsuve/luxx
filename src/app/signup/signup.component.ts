import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpLoading: boolean = false;

  signUpForm: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'The email is required.' },
      { type: 'email', message: 'Enter a valid email address.' }
    ],
    'fullName': [
      { type: 'required', message: 'The full name is required.' },
      { type: 'minlength', message: 'Full name must be at least 5 characters long.' }
    ],
    'alert': { type: '', message: '' }
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // Submit Sign Up
  submitSignUp(value) {
    this.signUpLoading = true;
    this.userService.getUserByEmail(value.email).subscribe(res => {
      if(res) {
        this.userService.createUser({
          email: value.email,
          fullName: value.fullName,
          profile: '',
          country: '',
          signUpDate: new Date(),
          token: '',
          verified: false,
          language: 'en',
          currency: 'USD',
          darkMode: false
        }).subscribe(res => {
          // Reset Fields
          this.signUpForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            fullName: new FormControl('', [Validators.required, Validators.minLength(5)])
          });

          this.validation_messages.alert = {
            type: 'success',
            message: 'You have been successfully registered. Follow your email address to verify your account.'
          };

          this.signUpLoading = false;
        });
      } else {
        this.validation_messages.alert = {
          type: 'error',
          message: 'This email has already been registered on the platform.'
        };
      }
    });
  }

}
