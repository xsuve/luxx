import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { UtilsService } from '../services/utils.service';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  currentStep: number = 0;

  contact: Contact = new Contact();
  loggedInUser: User;
  companies: Company[] = [];
  editContactForm: FormGroup;

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
    private route: ActivatedRoute,
    private contactService: ContactService,
    private userService: UserService,
    private companyService: CompanyService
  ) {
    this.route.params.subscribe(params => {
      this.contactService.getContact(params['id']).subscribe(res => {
        this.contact = res;
      });
    });

    this.loggedInUser = this.userService.getLoggedInUser();

    this.companyService.getCompanies(this.loggedInUser._id).subscribe(res => {
      this.companies = res;
    });


    // Init Translations
    this.initTranslations();
  }

  ngOnInit() {
    this.editContactForm = this.fb.group({
      company: [this.contact.companyId],
      companyPosition: [this.contact.companyPosition],
      stage: [this.contact.stage, [Validators.required]],
      fullName: [this.contact.fullName, [Validators.required, Validators.minLength(5)]],
      email: [this.contact.email, [Validators.required, Validators.email]],
      phone: [this.contact.phone, [Validators.minLength(10)]],
      country: [this.contact.country],
      address: [this.contact.address],
      facebook: [this.contact.facebook],
      linkedin: [this.contact.linkedin],
      twitter: [this.contact.twitter],
      instagram: [this.contact.instagram],
      github: [this.contact.github],
      youtube: [this.contact.youtube]
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
      this.editContactForm.get('companyPosition')!.setValidators(Validators.required);
      this.editContactForm.get('companyPosition')!.markAsDirty();
    } else {
      this.editContactForm.get('companyPosition')!.clearValidators();
      this.editContactForm.get('companyPosition')!.markAsPristine();
    }
    this.editContactForm.get('companyPosition')!.updateValueAndValidity();
  }

  // Submit Edit Contact
  submitEditContact(value) {
    this.contactService.updateContact(this.contact._id, {
      companyId: value.company,
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
      this.editContactForm = this.fb.group({
        company: new FormControl(this.contact.companyId),
        companyPosition: new FormControl(this.contact.companyPosition),
        stage: new FormControl(this.contact.stage, [Validators.required]),
        fullName: new FormControl(this.contact.fullName, [Validators.required, Validators.minLength(5)]),
        email: new FormControl(this.contact.email, [Validators.required, Validators.email]),
        phone: new FormControl(this.contact.phone, [Validators.minLength(10)]),
        country: new FormControl(this.contact.country),
        address: new FormControl(this.contact.address),
        facebook: new FormControl(this.contact.facebook),
        linkedin: new FormControl(this.contact.linkedin),
        twitter: new FormControl(this.contact.twitter),
        instagram: new FormControl(this.contact.instagram),
        github: new FormControl(this.contact.github),
        youtube: new FormControl(this.contact.youtube)
      });

      this.router.navigate(['/contact/' + this.contact._id]);
    });
  }

}
