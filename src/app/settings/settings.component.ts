import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  loggedInUser: User;

  availableLanguages = ['English', 'Romanian', 'German', 'Spain'];
  availableCurrencies = ['US Dollar (USD)', 'Euro (EUR)', 'Romanian Leu (RON)'];

  settingsForm: FormGroup;
  validation_messages = {
    'language': [
      { type: 'required', message: 'The language setting is required.' }
    ],
    'currency': [
      { type: 'required', message: 'The currency setting is required.' }
    ],
    'darkMode': [
      { type: 'required', message: 'The dark mode setting is required.' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      language: [this.availableLanguages[0], [Validators.required]],
      currency: [this.availableCurrencies[0], [Validators.required]],
      darkMode: [false, [Validators.required]]
    });
  }

}
