import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilsService } from '../services/utils.service';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

import { PipelineContact, Pipeline } from '../models/pipeline.model';
import { PipelineService } from '../services/pipeline.service';

import { SearchContactsPipe } from '../pipes/search-contacts.pipe';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  loggedInUser: User;
  companies: Company[] = [];
  contacts: Contact[] = [];
  pipelines: Pipeline[] = [];

  query: string = '';
  filteredContacts: Contact[] = [];

  drawerRef: any;


  // Add Task
  @ViewChild('addTaskTemplate', { static: false }) addTaskTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Add Task Form
  addTaskForm: FormGroup;
  add_task_validation_messages = {
    'title': [
      { type: 'required', message: 'The title is required.' }
    ],
    'deadline': [
      { type: 'required', message: 'The deadline is required.' }
    ],
    'type': [
      { type: 'required', message: 'The type is required.' }
    ]
  };

  // Add to Pipeline
  @ViewChild('addToPipelineTemplate', { static: false }) addToPipelineTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Add to Pipeline Form
  addToPipelineForm: FormGroup;
  add_pipeline_validation_messages = {
    'pipeline': [
      { type: 'required', message: 'The pipeline is required.' }
    ]
  };

  constructor(
    private utilsService: UtilsService,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private contactService: ContactService,
    private companyService: CompanyService,
    private pipelineService: PipelineService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();

    // Companies
    this.companyService.getCompanies(this.loggedInUser._id).subscribe(res => {
      this.companies = res;
    });

    // Pipelines
    this.pipelineService.getPipelines(this.loggedInUser._id).subscribe(res => {
      this.pipelines = res;
    });

    // Add Task Form
    this.addTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      type: [null, [Validators.required]],
      notes: ['']
    });

    // Add to Pipeline Form
    this.addToPipelineForm = this.fb.group({
      pipeline: [null, [Validators.required]],
      value: [0]
    });
  }

  ngOnInit() {
    // Fetch Contacts
    this.fetchContacts();
  }

  // Fetch Contacts
  fetchContacts() {
    this.contactService.getContacts(this.loggedInUser._id).subscribe(res => {
      this.contacts = res;
      this.filteredContacts = res;
    });
  }

  // Can Add to Pipeline
  canAddToPipeline(id) {
    for(let pipeline of this.pipelines) {
      for(let contact of pipeline.contacts) {
        if(contact.contactId == id) {
          return false;
        }
      }
      return true;
    }
  }

  // Get Company
  getCompany(id) {
    for(let company of this.companies) {
      if(company._id == id) {
        return company;
      }
    }
  }

  // Toggle Filters
  filtersToggled: boolean = false;
  toggleFilters() {
    if(this.filtersToggled == false) {
      this.filtersToggled = true;
    } else {
      this.filtersToggled = false;
    }
  }

  // Add Task
  addTask(contact) {
    this.drawerService.create({
      nzTitle: 'Add Task to ' + contact.fullName,
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.addTaskTemplate,
      nzContentParams: {
        value: contact
      }
    });
  }

  // Submit Add Task
  submitAddTask(value, contactId) {
    this.contactService.addTask({
      userId: this.loggedInUser._id,
      contactId: contactId,
      title: value.title,
      deadline: value.deadline,
      type: value.type,
      notes: value.notes,
      addDate: new Date(),
      completed: false
    }).subscribe(res => {
      // Reset Fields
      this.addTaskForm = this.fb.group({
        title: new FormControl('', [Validators.required]),
        deadline: new FormControl('', [Validators.required]),
        type: new FormControl(null, [Validators.required]),
        notes: new FormControl('')
      });
    });
  }

  // Delete Contact
  deleteContact(id) {
    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: 'Confirm Delete Contact',
      nzContent: 'Are you sure you want to delete this contact?',
      nzOkText: 'Yes, Delete Contact',
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        // Delete Contact Tasks
        this.contactService.getTasks(id).subscribe(tasks => {
          for(let task of tasks) {
            this.contactService.deleteTask(task._id).subscribe(res => {
              //
            });
          }
        });

        // Delete Contact
        this.contactService.deleteContact(id).subscribe(res => {
          if(res) {
            this.fetchContacts();
          }
        });
      }
    });
  }

  // Add to Pipeline
  addToPipeline(contact) {
    this.drawerRef = this.drawerService.create({
      nzTitle: 'Add Contact to Pipeline',
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.addToPipelineTemplate,
      nzContentParams: {
        value: contact
      }
    });
  }

  // Get Pipeline
  getPipeline(id) {
    for(let pipeline of this.pipelines) {
      if(pipeline._id == id) {
        return pipeline;
      }
    }
  }

  // Submit Add to Pipeline
  submitAddToPipeline(value, contactId) {
    let pipeline = this.getPipeline(value.pipeline);
    let pipelineContacts: any[] = this.getPipeline(value.pipeline).contacts;
    pipelineContacts.push({
      contactId: contactId,
      value: value.value
    });

    this.pipelineService.updatePipeline(value.pipeline, {
      title: pipeline.title,
      contacts: pipelineContacts
    }).subscribe(res => {
      this.drawerRef.close(this.addToPipelineTemplate);

      // Reset Fields
      this.addToPipelineForm = this.fb.group({
        pipeline: new FormControl(null, [Validators.required]),
        value: new FormControl(0)
      });
    });
  }

}
