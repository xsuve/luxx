import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { UtilsService } from '../services/utils.service';

import { NzModalService } from 'ng-zorro-antd/modal';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  loggedInUser: User;
  companies: Company[] = [];

  constructor(
    private translate: TranslateService,
    private utilsService: UtilsService,
    private modalService: NzModalService,
    private userService: UserService,
    private contactService: ContactService,
    private companyService: CompanyService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();

    this.companyService.getCompanies(this.loggedInUser._id).subscribe(res => {
      this.companies = res;
    });
  }

  ngOnInit() {
  }

  // Fetch Companies
  fetchCompanies() {
    this.companyService.getCompanies(this.loggedInUser._id).subscribe(res => {
      this.companies = res;
    });
  }

  // Delete Company
  deleteCompany(id) {
    let deleteCompanyTranslations = {
      title: 'Confirm Delete Company',
      content: 'Are you sure you want to delete this company?',
      okText: 'Yes, Delete Company',
      cancelText: 'Cancel'
    };

    this.translate.get('confirm_delete_company').subscribe(res => {
      deleteCompanyTranslations.title = res;
    });
    this.translate.get('are_you_sure_delete_company').subscribe(res => {
      deleteCompanyTranslations.content = res;
    });
    this.translate.get('yes_delete_company').subscribe(res => {
      deleteCompanyTranslations.okText = res;
    });
    this.translate.get('cancel').subscribe(res => {
      deleteCompanyTranslations.cancelText = res;
    });

    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: deleteCompanyTranslations.title,
      nzContent: deleteCompanyTranslations.content,
      nzOkText: deleteCompanyTranslations.okText,
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: deleteCompanyTranslations.cancelText,
      nzOnOk: () => {
        // Remove Company from Contacts
        this.contactService.getContacts(this.loggedInUser._id).subscribe(contacts => {
          for(let contact of contacts) {
            if(contact.companyId == id) {
              this.contactService.updateContact(contact._id, {
                companyId: null,
                companyPosition: contact.companyPosition,
                stage: contact.stage,
                fullName: contact.fullName,
                email: contact.email,
                phone: contact.phone,
                country: contact.country,
                address: contact.address,
                facebook: contact.facebook,
                linkedin: contact.linkedin,
                twitter: contact.twitter,
                instagram: contact.instagram,
                github: contact.github,
                youtube: contact.youtube
              }).subscribe(res => {
                //
              });
            }
          }
        });

        // Delete Company
        this.companyService.deleteCompany(id).subscribe(res => {
          if(res) {
            this.fetchCompanies();
          }
        });
      }
    });
  }

}
