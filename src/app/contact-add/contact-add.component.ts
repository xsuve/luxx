import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { UtilsService } from '../services/utils.service';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  currentStep: number = 0;

  loggedInUser: User;
  companies: Company[] = [];

  addContactForm: FormGroup;
  validation_messages = {
    'stage': [
      { type: 'required', message: 'The stage is required.' }
    ],
    'fullName': [
      { type: 'required', message: 'The full name is required.' },
      { type: 'minlength', message: 'Full name must be at least 5 characters long.' }
    ],
    'email': [
      { type: 'required', message: 'The email is required.' },
      { type: 'email', message: 'Enter a valid email address.' }
    ],
    'phone': [
      { type: 'minlength', message: 'Phone must be at least 10 characters long.' }
    ],
    'companyPosition': [
      { type: 'required', message: 'The company position is required.' }
    ]
  };
  companySelected: boolean = false;

  constructor(
    private translate: TranslateService,
    private utilsService: UtilsService,
    private fb: FormBuilder,
    private router: Router,
    private contactService: ContactService,
    private userService: UserService,
    private companyService: CompanyService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();

    this.companyService.getCompanies(this.loggedInUser._id).subscribe(res => {
      this.companies = res;
    });


    // Init Translations
    this.initTranslations();
  }

  ngOnInit() {
    this.addContactForm = this.fb.group({
      company: [null],
      companyPosition: [''],
      stage: [null, [Validators.required]],
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.minLength(10)]],
      country: [null],
      address: [''],
      facebook: [''],
      linkedin: [''],
      twitter: [''],
      instagram: [''],
      github: [''],
      youtube: ['']
    });
  }

  // Init Translations
  initTranslations() {
    this.translate.get('the_stage_is_required').subscribe(res => {
      this.validation_messages.stage[0].message = res;
    });
    this.translate.get('the_full_name_is_required').subscribe(res => {
      this.validation_messages.fullName[0].message = res;
    });
    this.translate.get('full_name_minlength').subscribe(res => {
      this.validation_messages.fullName[1].message = res;
    });
    this.translate.get('the_email_is_required').subscribe(res => {
      this.validation_messages.email[0].message = res;
    });
    this.translate.get('email_valid_address').subscribe(res => {
      this.validation_messages.email[1].message = res;
    });
    this.translate.get('phone_minlength').subscribe(res => {
      this.validation_messages.phone[0].message = res;
    });
    this.translate.get('the_company_position_is_required').subscribe(res => {
      this.validation_messages.companyPosition[0].message = res;
    });
  }

  // Change Step
  changeStep(step) {
    this.currentStep = step;
  }

  // Company Selected
  companySelectedEvent($event) {
    if($event != null) {
      this.addContactForm.get('companyPosition')!.setValidators(Validators.required);
      this.addContactForm.get('companyPosition')!.markAsDirty();
    } else {
      this.addContactForm.get('companyPosition')!.clearValidators();
      this.addContactForm.get('companyPosition')!.markAsPristine();
    }
    this.addContactForm.get('companyPosition')!.updateValueAndValidity();
  }

  // Submit Add Contact
  submitAddContact(value) {
    this.contactService.createContact({
      userId: this.loggedInUser._id,
      companyId: value.company || null,
      companyPosition: value.companyPosition,
      stage: value.stage,
      fullName: value.fullName,
      email: value.email,
      phone: value.phone,
      country: value.country,
      address: value.address,
      facebook: value.facebook,
      linkedin: value.linkedin,
      twitter: value.twitter,
      instagram: value.instagram,
      github: value.github,
      youtube: value.youtube
    }).subscribe(res => {
      // Reset Fields
      this.addContactForm = this.fb.group({
        company: new FormControl(null),
        companyPosition: new FormControl(''),
        stage: new FormControl(null, [Validators.required]),
        fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.minLength(10)]),
        country: new FormControl(null),
        address: new FormControl(''),
        facebook: new FormControl(''),
        linkedin: new FormControl(''),
        twitter: new FormControl(''),
        instagram: new FormControl(''),
        github: new FormControl(''),
        youtube: new FormControl('')
      });

      this.router.navigate(['/contacts']);
    });
  }

}
