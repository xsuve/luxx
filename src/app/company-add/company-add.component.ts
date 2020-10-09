import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {

  currentStep: number = 0;

  loggedInUser: User;

  addCompanyForm: FormGroup;
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
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();


    // Init Translations
    this.initTranslations();
  }

  ngOnInit() {
    this.addCompanyForm = this.fb.group({
      image: [''],
      industry: [null, [Validators.required]],
      name: ['', [Validators.required]],
      website: [''],
      numberOfEmployees: [''],
      annualRevenue: ['']
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

  // Submit Add Company
  submitAddCompany(value) {
    this.companyService.createCompany({
      userId: this.loggedInUser._id,
      image: value.image,
      industry: value.industry,
      name: value.name,
      website: value.website,
      numberOfEmployees: value.numberOfEmployees,
      annualRevenue: value.annualRevenue
    }).subscribe(res => {
      // Reset Fields
      this.addCompanyForm = this.fb.group({
        image: new FormControl(''),
        industry: new FormControl(null, [Validators.required]),
        name: new FormControl('', [Validators.required]),
        website: new FormControl(''),
        numberOfEmployees: new FormControl(''),
        annualRevenue: new FormControl('')
      });

      this.router.navigate(['/companies']);
    });
  }

  // Handle Image Upload
  loadingImagePreview = false;
  avatarUrl?: string;

  beforeUpload = (file: UploadFile, _fileList: UploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if(!isJpgOrPng) {
        this.messageService.error('You can only upload JPG & PNG files!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if(!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  handleChange(info: { file: UploadFile }): void {
    switch(info.file.status) {
      case 'uploading':
        this.loadingImagePreview = true;
      break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loadingImagePreview = false;
          this.avatarUrl = img;

          this.messageService.success('The image has been uploaded!');
        });
      break;
      case 'error':
        this.messageService.error('Network error!');
        this.loadingImagePreview = false;
      break;
    }
  }

  // Get Base64
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

}
