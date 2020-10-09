import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { UtilsService } from '../services/utils.service';

import { UploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  currentStep: number = 0;

  loggedInUser: User;
  company: Company = new Company();

  editCompanyForm: FormGroup;
  validation_messages = {
    'industry': [
      { type: 'required', message: 'The industry is required.' }
    ],
    'name': [
      { type: 'required', message: 'The name is required.' }
    ]
  };

  constructor(
    private translate: TranslateService,
    private utilsService: UtilsService,
    private messageService: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.route.params.subscribe(params => {
      this.companyService.getCompany(params['id']).subscribe(res => {
        this.company = res;
      });
    });

    this.loggedInUser = this.userService.getLoggedInUser();


    // Init Translations
    this.initTranslations();
  }

  ngOnInit() {
    this.editCompanyForm = this.fb.group({
      image: [this.company.image],
      industry: [this.company.industry, [Validators.required]],
      name: [this.company.name, [Validators.required]],
      website: [this.company.website],
      numberOfEmployees: [this.company.numberOfEmployees],
      annualRevenue: [this.company.annualRevenue]
    });
  }

  // Init Translations
  initTranslations() {
    this.translate.get('the_industry_is_required').subscribe(res => {
      this.validation_messages.industry[0].message = res;
    });
    this.translate.get('the_name_is_required').subscribe(res => {
      this.validation_messages.name[0].message = res;
    });
  }

  // Submit Edit Company
  submitEditCompany(value) {
    this.companyService.updateCompany(this.company._id, {
      image: value.image,
      industry: value.industry,
      name: value.name,
      website: value.website,
      numberOfEmployees: value.numberOfEmployees,
      annualRevenue: value.annualRevenue
    }).subscribe(res => {
      // Reset Fields
      this.editCompanyForm = this.fb.group({
        image: new FormControl(this.company.image),
        industry: new FormControl(this.company.industry, [Validators.required]),
        name: new FormControl(this.company.name, [Validators.required]),
        website: new FormControl(this.company.website),
        numberOfEmployees: new FormControl(this.company.numberOfEmployees),
        annualRevenue: new FormControl(this.company.annualRevenue)
      });

      this.router.navigate(['/company/' + this.company._id]);
    });
  }

}
