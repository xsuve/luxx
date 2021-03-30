import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { UtilsService } from '../services/utils.service';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  loggedInUser: User;

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
    private translate: TranslateService,
    private notification: NzNotificationService,
    private utilsService: UtilsService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();


    // Init Translations
    this.initTranslations();
  }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      language: [this.loggedInUser.language, [Validators.required]],
      currency: [this.loggedInUser.currency, [Validators.required]],
      darkMode: [this.loggedInUser.darkMode, [Validators.required]]
    });
  }

  // Init Translations
  initTranslations() {
    this.translate.get('the_language_setting_is_required').subscribe(res => {
      this.validation_messages.language[0].message = res;
    });
    this.translate.get('the_currency_setting_is_required').subscribe(res => {
      this.validation_messages.currency[0].message = res;
    });
    this.translate.get('the_dark_mode_setting_is_required').subscribe(res => {
      this.validation_messages.darkMode[0].message = res;
    });
  }

  // Language Changed
  languageSelectedEvent($event) {
    this.loggedInUser.language = $event;
    this.userService.updateUser(this.loggedInUser._id, this.loggedInUser).subscribe(res => {
      if(res) {
        this.notification.create('success', 'Settings Updated!', 'The settings of your account have been successfully updated.', { nzClass: 'luxx-notification' });
      } else {
        this.notification.create('error', 'Update Error!', 'The settings of your account could not be updated.', { nzClass: 'luxx-notification' });
      }
    });
  }

  // Currency Changed
  currencySelectedEvent($event) {
    this.loggedInUser.currency = $event;
    this.userService.updateUser(this.loggedInUser._id, this.loggedInUser).subscribe(res => {
      if(res) {
        this.notification.create('success', 'Settings Updated!', 'The settings of your account have been successfully updated.', { nzClass: 'luxx-notification' });
      } else {
        this.notification.create('error', 'Update Error!', 'The settings of your account could not be updated.', { nzClass: 'luxx-notification' });
      }
    });
  }

  // Submit Update Settings
  submitUpdateSettings(value) {
    //
  }

}
