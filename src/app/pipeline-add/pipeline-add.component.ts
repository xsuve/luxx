import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

import { PipelineContact, Pipeline } from '../models/pipeline.model';
import { PipelineService } from '../services/pipeline.service';

@Component({
  selector: 'app-pipeline-add',
  templateUrl: './pipeline-add.component.html',
  styleUrls: ['./pipeline-add.component.css']
})
export class PipelineAddComponent implements OnInit {

  loggedInUser: User;
  contacts: Contact[] = [];

  addPipelineForm: FormGroup;
  validation_messages = {
    'title': [
      { type: 'required', message: 'The title is required.' }
    ],
    'contacts': [
      { type: 'required', message: 'Select at least one contact.' }
    ]
  };

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private contactService: ContactService,
    private pipelineService: PipelineService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();

    // Contacts
    this.contactService.getContacts(this.loggedInUser._id).subscribe(res => {
      this.contacts = res;
    });


    // Init Translations
    this.initTranslations();
  }

  ngOnInit() {
    this.addPipelineForm = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

  // Init Translations
  initTranslations() {
    this.translate.get('the_title_is_required').subscribe(res => {
      this.validation_messages.title[0].message = res;
    });
    this.translate.get('select_at_least_one_contact').subscribe(res => {
      this.validation_messages.contacts[0].message = res;
    });
  }

  // Submit Add Pipeline
  submitAddPipeline(value) {
    this.pipelineService.createPipeline({
      userId: this.loggedInUser._id,
      title: value.title,
      contacts: new Array<PipelineContact>()
    }).subscribe(res => {
      // Reset Fields
      this.addPipelineForm = this.fb.group({
        title: new FormControl('', [Validators.required])
      });

      this.router.navigate(['/pipelines']);
    });
  }

}
