import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from '../services/utils.service';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Contact } from '../models/contact.model';

import { ContactService } from '../services/contact.service';

import { Pipeline } from '../models/pipeline.model';
import { PipelineService } from '../services/pipeline.service';

@Component({
  selector: 'app-pipeline-view',
  templateUrl: './pipeline-view.component.html',
  styleUrls: ['./pipeline-view.component.css']
})
export class PipelineViewComponent implements OnInit {

  loggedInUser: User;
  pipeline: Pipeline = new Pipeline();
  contacts: Contact[] = [];

  prospectingContacts = [];
  securingLeadContacts = [];
  pitchingSolutionContacts = [];
  qualifyingDealsContacts = [];
  sendingProposalContacts = [];
  dealNegotiationContacts = [];
  closureContacts = [];

  constructor(
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private contactService: ContactService,
    private pipelineService: PipelineService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();

    this.fetchContacts();
    this.fetchPipeline();
  }

  ngOnInit() {

  }

  // Fetch Pipeline
  fetchPipeline() {
    this.route.params.subscribe(params => {
      this.pipelineService.getPipeline(params['id']).subscribe(res => {
        this.pipeline = res;

        res.contacts.forEach(contactId => {
          if(this.getContact(contactId) && this.getContact(contactId).stage == 'prospecting') {
            this.prospectingContacts.push(contactId);
          } else if(this.getContact(contactId) && this.getContact(contactId).stage == 'securing-lead') {
            this.securingLeadContacts.push(contactId);
          } else if(this.getContact(contactId) && this.getContact(contactId).stage == 'pitching-solution') {
            this.pitchingSolutionContacts.push(contactId);
          } else if(this.getContact(contactId) && this.getContact(contactId).stage == 'qualifying-deals') {
            this.qualifyingDealsContacts.push(contactId);
          } else if(this.getContact(contactId) && this.getContact(contactId).stage == 'sending-proposal') {
            this.sendingProposalContacts.push(contactId);
          } else if(this.getContact(contactId) && this.getContact(contactId).stage == 'deal-negotiation') {
            this.dealNegotiationContacts.push(contactId);
          } else if(this.getContact(contactId) && this.getContact(contactId).stage == 'closure') {
            this.closureContacts.push(contactId);
          }
        });
      });
    });
  }

  // Fetch Contacts
  fetchContacts() {
    this.contactService.getContacts(this.loggedInUser._id).subscribe(res => {
      this.contacts = res;
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

}
