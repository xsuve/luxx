import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

@Component({
  selector: 'app-pipeline-view',
  templateUrl: './pipeline-view.component.html',
  styleUrls: ['./pipeline-view.component.css']
})
export class PipelineViewComponent implements OnInit {

  loggedInUser: User;
  boards = [
    { title: 'PROSPECTING', slug: 'prospecting', dotBackground: 'bg-yellow', contacts: new Array<PipelineContact>() },
    { title: 'SECURING LEAD', slug: 'securing-lead', dotBackground: 'bg-orange', contacts: new Array<PipelineContact>() },
    { title: 'PITCHING SOLUTION', slug: 'pitching-solution', dotBackground: 'bg-red', contacts: new Array<PipelineContact>() },
    { title: 'QUALIFYING DEALS', slug: 'qualifying-deals', dotBackground: 'bg-purple', contacts: new Array<PipelineContact>() },
    { title: 'SENDING PROPOSAL', slug: 'sending-proposal', dotBackground: 'bg-blue', contacts: new Array<PipelineContact>() },
    { title: 'DEAL NEGOTIATION', slug: 'deal-negotiation', dotBackground: 'bg-cyan', contacts: new Array<PipelineContact>() },
    { title: 'CLOSURE', slug: 'closure', dotBackground: 'bg-green', contacts: new Array<PipelineContact>() }
  ];
  pipeline: Pipeline = new Pipeline();
  contacts: Contact[] = [];
  companies: Company[] = [];

  drawerRef: any;


  // Edit Pipeline Contact
  @ViewChild('editPipelineContactTemplate', { static: false }) editPipelineContactTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Edit Pipeline Contact Form
  editPipelineContactForm: FormGroup;
  edit_pipeline_contact_validation_messages = {
  };

  constructor(
    private utilsService: UtilsService,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private contactService: ContactService,
    private companyService: CompanyService,
    private pipelineService: PipelineService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();

    this.fetchData();
    this.fetchPipeline();

    // Edit Pipeline Contact Form
    this.editPipelineContactForm = this.fb.group({
      value: [0]
    });
  }

  ngOnInit() {

  }

  // Fetch Pipeline
  fetchPipeline() {
    this.route.params.subscribe(params => {
      this.pipelineService.getPipeline(params['id']).subscribe(res => {
        if(res) {
          this.pipeline = res;

          if(res.contacts) {
            this.fetchBoards();

            res.contacts.forEach(pipelineContact => {
              let contact: any = this.getContact(pipelineContact.contactId);
              contact.value = pipelineContact.value;
              if(contact && contact.stage == 'prospecting') {
                this.boards[0].contacts.push(contact);
              } else if(contact && contact.stage == 'securing-lead') {
                this.boards[1].contacts.push(contact);
              } else if(contact && contact.stage == 'pitching-solution') {
                this.boards[2].contacts.push(contact);
              } else if(contact && contact.stage == 'qualifying-deals') {
                this.boards[3].contacts.push(contact);
              } else if(contact && contact.stage == 'sending-proposal') {
                this.boards[4].contacts.push(contact);
              } else if(contact && contact.stage == 'deal-negotiation') {
                this.boards[5].contacts.push(contact);
              } else if(contact && contact.stage == 'closure') {
                this.boards[6].contacts.push(contact);
              }
            });
          }
        }
      });
    });
  }

  // Fetch Boards
  fetchBoards() {
    this.boards.forEach(board => {
      board.contacts = new Array<PipelineContact>();
    });
  }

  // Fetch Data
  fetchData() {
    // Contacts
    this.contactService.getContacts(this.loggedInUser._id).subscribe(res => {
      this.contacts = res;
    });
    // Companies
    this.companyService.getCompanies(this.loggedInUser._id).subscribe(res => {
      this.companies = res;
    });
  }

  // Get Contact
  getContact(id) {
    for(let contact of this.contacts) {
      if(contact._id == id) {
        return contact;
      }
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

  // Drag & Drop
  drop(event: CdkDragDrop<string[]>, dropStage: string) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    this.contactService.updateContact(event.item.data._id, {
      companyId: event.item.data.companyId,
      companyPosition: event.item.data.companyPosition,
      stage: dropStage,
      fullName: event.item.data.fullName,
      email: event.item.data.email,
      phone: event.item.data.phone,
      country: event.item.data.country,
      address: event.item.data.address,
      facebook: event.item.data.facebook,
      linkedin: event.item.data.linkedin,
      twitter: event.item.data.twitter,
      instagram: event.item.data.instagram,
      github: event.item.data.github,
      youtube: event.item.data.youtube
    }).subscribe(res => {
      event.item.data.stage = dropStage;
    });
  }

  // Edit Pipeline Contact
  editPipelineContact(contact) {
    this.drawerRef = this.drawerService.create({
      nzTitle: 'Edit Pipeline Contact',
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.editPipelineContactTemplate,
      nzContentParams: {
        value: contact
      }
    });
  }

  // Submit Edit Pipeline Contact
  submitEditPipelineContact(value, contactId) {
    let pipelineContacts: PipelineContact[] = this.pipeline.contacts;

    for(let i = 0; i < this.pipeline.contacts.length; i++) {
      if(this.pipeline.contacts[i].contactId == contactId) {
        pipelineContacts[i].value = value.value;
      }
    }

    this.pipelineService.updatePipeline(this.pipeline._id, {
      title: this.pipeline.title,
      contacts: pipelineContacts
    }).subscribe(res => {
      this.drawerRef.close(this.editPipelineContactTemplate);

      // Reset Fields
      this.editPipelineContactForm = this.fb.group({
        value: new FormControl(0)
      });
    });
  }

  // Delete Pipeline Contact
  deletePipelineContact(contact) {
    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: 'Confirm Delete Pipeline Contact',
      nzContent: 'Are you sure you want to delete this pipeline contact?',
      nzOkText: 'Yes, Delete Pipeline Contact',
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        let pipelineContacts: PipelineContact[] = this.pipeline.contacts;

        for(let i = 0; i < this.pipeline.contacts.length; i++) {
          if(this.pipeline.contacts[i].contactId == contact._id) {
            pipelineContacts.splice(i, 1);
          }
        }

        this.pipelineService.updatePipeline(this.pipeline._id, {
          title: this.pipeline.title,
          contacts: pipelineContacts
        }).subscribe(res => {
          this.fetchData();
          this.fetchPipeline();
        });
      }
    });
  }

}
