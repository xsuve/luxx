import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import moment from 'moment';

import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';

import { UtilsService } from '../services/utils.service';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Contact } from '../models/contact.model';
import { Task } from '../models/task.model';
import { Note } from '../models/note.model';
import { Invoice } from '../models/invoice.model';
import { Event } from '../models/event.model';

import { ContactService } from '../services/contact.service';

import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

import { Pipeline } from '../models/pipeline.model';
import { PipelineService } from '../services/pipeline.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {

  contact: Contact = new Contact();
  loggedInUser: User;
  companies: Company[] = [];
  pipelines: Pipeline[] = [];
  tasks: Task[] = [];
  notes: Note[] = [];
  invoices: Invoice[] = [];
  invoicesMinNumber: number = 0;
  events: Event[] = [];
  orders = [];

  taskNoNotes: string = 'No notes.';
  todayDate: Date = new Date();

  // Events Calendar
  @ViewChild('eventsCalendar', { static: false }) eventsCalendar: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    contentHeight: 'auto',
    eventTimeFormat: { hour: 'numeric', minute: '2-digit', meridiem: false, hour12: false },
    views: {
      timeGridWeek: {
        dayHeaderFormat: { weekday: 'short', day: 'numeric' },
        slotLabelFormat: { hour: 'numeric', minute: '2-digit', meridiem: false, hour12: false }
      },
      timeGridDay: {
        slotLabelFormat: { hour: 'numeric', minute: '2-digit', meridiem: false, hour12: false }
      }
    },
    navLinks: true,
    navLinkDayClick: (date, jsEvent) => {
      this.eventsCalendar.getApi().gotoDate(date);
      this.eventsCalendar.getApi().changeView('timeGridDay');
      this.eventsCalendarFormatTitle('day');
      this.eventsCalendarDisplay = 'day';
    },
    editable: true,
    droppable: true,
    headerToolbar: false,
    eventChange: (info) => {
      this.updateEvent({
        _id: info.event._def.extendedProps.objectId,
        title: info.event._def.title,
        startDateTime: info.event._instance.range.start,
        endDateTime: info.event._instance.range.end,
        type: info.event._def.extendedProps.type
      });
    },
    events: []
  };
  eventsCalendarTitle: string = '';
  eventsCalendarDisplay: string = 'week';


  drawerRef: any;
  

  // Add Task
  @ViewChild('addTaskTemplate', { static: false }) addTaskTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Add Task Form
  addTaskForm: FormGroup;
  add_task_form_validation_messages = {
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

  // Edit Task
  @ViewChild('editTaskTemplate', { static: false }) editTaskTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Edit Task Form
  editTaskForm: FormGroup;
  edit_task_form_validation_messages = {
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


  // Add Note
  @ViewChild('addNoteTemplate', { static: false }) addNoteTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Add Note Form
  addNoteForm: FormGroup;
  add_note_form_validation_messages = {
    'text': [
      { type: 'required', message: 'The text is required.' }
    ]
  };

  // Edit Note
  @ViewChild('editNoteTemplate', { static: false }) editNoteTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Edit Note Form
  editNoteForm: FormGroup;
  edit_note_form_validation_messages = {
    'text': [
      { type: 'required', message: 'The text is required.' }
    ]
  };


  // Add Invoice
  @ViewChild('addInvoiceTemplate', { static: false }) addInvoiceTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Add Invoice Form
  addInvoiceForm: FormGroup;
  add_invoice_form_validation_messages = {
    'number': [
      { type: 'required', message: 'The number is required.' }
    ],
    'dueDate': [
      { type: 'required', message: 'The due date is required.' }
    ]
  };

  // Edit Invoice
  @ViewChild('editInvoiceTemplate', { static: false }) editInvoiceTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Edit Invoice Form
  editInvoiceForm: FormGroup;
  edit_invoice_form_validation_messages = {
    'number': [
      { type: 'required', message: 'The number is required.' }
    ],
    'dueDate': [
      { type: 'required', message: 'The due date is required.' }
    ]
  };


  // Schedule Event
  @ViewChild('scheduleEventTemplate', { static: false }) scheduleEventTemplate?: TemplateRef<{
    $implicit: { value: any };
    drawerRef: NzDrawerRef<string>;
  }>;
  // Schedule Event Form
  scheduleEventForm: FormGroup;
  schedule_event_form_validation_messages = {
    'title': [
      { type: 'required', message: 'The title is required.' }
    ],
    'dateTimeInterval': [
      { type: 'required', message: 'The date & time interval is required.' }
    ],
    'type': [
      { type: 'required', message: 'The type is required.' }
    ]
  };

  constructor(
    private utilsService: UtilsService,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private userService: UserService,
    private companyService: CompanyService,
    private pipelineService: PipelineService
  ) {
    this.route.params.subscribe(params => {
      this.contactService.getContact(params['id']).subscribe(res => {
        this.contact = res;

        // Tasks
        this.fetchTasks(res._id);
        // Notes
        this.fetchNotes(res._id);
        // Invoices
        this.fetchInvoices(res._id);
        // Events
        this.fetchEvents(res._id);
      });
    });

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


    // Add Note Form
    this.addNoteForm = this.fb.group({
      text: ['', [Validators.required]]
    });


    // Add Invoice Form
    this.addInvoiceForm = this.fb.group({
      number: ['', [Validators.required]],
      value: [''],
      paid: [''],
      dueDate: ['', [Validators.required]]
    });


    // Schedule Event Form
    this.scheduleEventForm = this.fb.group({
      title: ['', [Validators.required]],
      dateTimeInterval: ['', [Validators.required]],
      type: [null, [Validators.required]]
    });
  }

  // Events Calendar
  eventsCalendarSelected($event) {
    switch($event) {
      case 'today':
        this.eventsCalendar.getApi().today();
      break;
      case 'month':
        this.eventsCalendar.getApi().changeView('dayGridMonth');
        this.eventsCalendarFormatTitle('month');
      break;
      case 'week':
        this.eventsCalendar.getApi().changeView('timeGridWeek');
        this.eventsCalendarFormatTitle('week');
      break;
      case 'day':
        this.eventsCalendar.getApi().changeView('timeGridDay');
        this.eventsCalendarFormatTitle('day');
      break;
      default:
        this.eventsCalendar.getApi().changeView('timeGridWeek');
        this.eventsCalendarFormatTitle('week');
      break;
    }
  }
  eventsCalendarFormatTitle(type) {
    switch(type) {
      case 'month':
        this.eventsCalendarTitle = moment(this.eventsCalendar.getApi().getDate().toISOString()).format('MMMM YYYY');
      break;
      case 'week':
        this.eventsCalendarTitle = moment(this.eventsCalendar.getApi().getDate().toISOString()).format('D MMM') + ' - ' + moment(this.eventsCalendar.getApi().getDate().toISOString()).add(6, 'days').format('D MMM, YYYY');
      break;
      case 'day':
        this.eventsCalendarTitle = moment(this.eventsCalendar.getApi().getDate().toISOString()).format('MMMM D, YYYY');
      break;
    }
  }
  eventsCalendarPrev() {
    this.eventsCalendar.getApi().prev();
    this.eventsCalendarFormatTitle(this.eventsCalendarDisplay);
  }
  eventsCalendarNext() {
    this.eventsCalendar.getApi().next();
    this.eventsCalendarFormatTitle(this.eventsCalendarDisplay);
  }

  ngOnInit() {
    // Format Events Calendar Title Initial Date
    this.eventsCalendarTitle = moment(this.todayDate).subtract(2, 'days').format('D MMM') + ' - ' + moment(this.todayDate).add(4, 'days').format('D MMM, YYYY');
  }

  // Fetch Tasks
  fetchTasks(contactId) {
    this.contactService.getTasks(contactId).subscribe(res => {
      this.tasks = res;
    });
  }

  // Fetch Notes
  fetchNotes(contactId) {
    this.contactService.getNotes(contactId).subscribe(res => {
      this.notes = res;
    });
  }

  // Fetch Invoices
  fetchInvoices(contactId) {
    this.contactService.getInvoices(contactId).subscribe(res => {
      this.invoices = res;
    });
  }

  // Fetch Events
  fetchEvents(contactId) {
    this.contactService.getEvents(contactId).subscribe(res => {
      this.events = res;
      let calendarEvents = this.eventsCalendar.getApi().getEvents();
      calendarEvents.forEach(event => {
        event.remove();
      });
      res.map(event => {
        this.eventsCalendar.getApi().addEvent({
          title: event.title,
          start: event.startDateTime,
          end: event.endDateTime,
          classNames: [event.type],
          objectId: event._id,
          type: event.type
        });
      });
    });
  }

  // Get Company By Id
  getCompany(id) {
    for(let company of this.companies) {
      if(company._id == id) {
        return company;
      }
    }
  }

  // Task Type Color
  taskTypeColor(type) {
    switch(type) {
      case 'todo':
        return 'bg-orange-light text-orange';
      break;
      case 'call':
        return 'bg-green-light text-green';
      break;
      default:
        return 'bg-gray-light text-gray';
      break;
    }
  }

  // Task Type Name
  taskTypeName(type) {
    switch(type) {
      case 'todo':
        return 'To-do';
      break;
      case 'call':
        return 'Call';
      break;
      default:
        return 'Type';
      break;
    }
  }

  // Task Overdue
  taskOverdue(deadline) {
    let deadlineDate = new Date(deadline);
    if(this.todayDate.getTime() > deadlineDate.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  // View Task
  viewTask(task) {
    //
  }

  // Add Task
  addTask(contact) {
    this.drawerRef = this.drawerService.create({
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
      if(res) {
        this.drawerRef.close(this.addTaskTemplate);

        this.fetchTasks(contactId);

        // Reset Fields
        this.addTaskForm = this.fb.group({
          title: new FormControl('', [Validators.required]),
          deadline: new FormControl('', [Validators.required]),
          type: new FormControl(null, [Validators.required]),
          notes: new FormControl('')
        });
      }
    });
  }

  // Toggle Task Completed
  toggleTaskCompleted(task) {
    this.updateTask(task);
  }

  // Edit Task
  editTask(task) {
    // Edit Task Form
    this.editTaskForm = this.fb.group({
      title: [task.title, [Validators.required]],
      deadline: [task.deadline, [Validators.required]],
      type: [task.type, [Validators.required]],
      notes: [task.notes]
    });

    this.drawerRef = this.drawerService.create({
      nzTitle: 'Edit Task',
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.editTaskTemplate,
      nzContentParams: {
        value: task
      }
    });
  }

  // Submit Edit Task
  submitEditTask(value, task) {
    this.contactService.updateTask(task._id, {
      title: value.title,
      deadline: value.deadline,
      type: value.type,
      notes: value.notes,
      completed: task.completed
    }).subscribe(res => {
      if(res) {
        this.drawerRef.close(this.editTaskTemplate);

        this.fetchTasks(task.contactId);

        // Reset Fields
        this.editTaskForm = this.fb.group({
          title: new FormControl('', [Validators.required]),
          deadline: new FormControl('', [Validators.required]),
          type: new FormControl(null, [Validators.required]),
          notes: new FormControl('')
        });
      }
    });
  }

  // Update Task
  updateTask(task) {
    if(task.title.length > 0) {
      this.contactService.updateTask(task._id, {
        title: task.title,
        deadline: task.deadline,
        type: task.type,
        notes: task.notes,
        completed: task.completed
      }).subscribe(res => {
        //
      });
    }
  }

  deleteTask(id) {
    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: 'Confirm Delete Task',
      nzContent: 'Are you sure you want to delete this task?',
      nzOkText: 'Yes, Delete Task',
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        // Delete Task
        this.contactService.deleteTask(id).subscribe(res => {
          if(res) {
            this.fetchTasks(this.contact._id);
          }
        });
      }
    });
  }


  // View Note
  viewNote(note) {
    //
  }

  // Add Note
  addNote(contact) {
    this.drawerRef = this.drawerService.create({
      nzTitle: 'Add Note to ' + contact.fullName,
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.addNoteTemplate,
      nzContentParams: {
        value: contact
      }
    });
  }

  // Submit Add Task
  submitAddNote(value, contactId) {
    this.contactService.addNote({
      userId: this.loggedInUser._id,
      contactId: contactId,
      text: value.text,
      addDate: new Date()
    }).subscribe(res => {
      if(res) {
        this.drawerRef.close(this.addNoteTemplate);

        this.fetchNotes(contactId);

        // Reset Fields
        this.addNoteForm = this.fb.group({
          text: new FormControl('', [Validators.required])
        });
      }
    });
  }

  // Edit Note
  editNote(note) {
    // Edit Note Form
    this.editNoteForm = this.fb.group({
      text: [note.text, [Validators.required]]
    });

    this.drawerRef = this.drawerService.create({
      nzTitle: 'Edit Note',
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.editNoteTemplate,
      nzContentParams: {
        value: note
      }
    });
  }

  // Submit Edit Note
  submitEditNote(value, note) {
    this.contactService.updateNote(note._id, {
      text: value.text
    }).subscribe(res => {
      if(res) {
        this.drawerRef.close(this.editNoteTemplate);

        this.fetchNotes(note.contactId);

        // Reset Fields
        this.editNoteForm = this.fb.group({
          text: new FormControl('', [Validators.required])
        });
      }
    });
  }

  // Update Note
  updateNote(note) {
    if(note.text.length > 0) {
      this.contactService.updateNote(note._id, {
        text: note.text
      }).subscribe(res => {
        //
      });
    }
  }

  deleteNote(id) {
    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: 'Confirm Delete Note',
      nzContent: 'Are you sure you want to delete this note?',
      nzOkText: 'Yes, Delete Note',
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        // Delete Note
        this.contactService.deleteNote(id).subscribe(res => {
          if(res) {
            this.fetchNotes(this.contact._id);
          }
        });
      }
    });
  }


  // Add Invoice
  addInvoice(contact) {
    // Invoices Min Number
    this.invoicesMinNumber = (this.invoices.reduce(function(prev, current) {
      return (prev.number > current.number) ? prev : current;
    }).number + 1);

    this.drawerRef = this.drawerService.create({
      nzTitle: 'Add Invoice to ' + contact.fullName,
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.addInvoiceTemplate,
      nzContentParams: {
        value: contact
      }
    });
  }

  // Submit Add Invoice
  submitAddInvoice(value, contactId) {
    this.contactService.addInvoice({
      userId: this.loggedInUser._id,
      contactId: contactId,
      number: value.number,
      value: value.value,
      paid: value.paid,
      dueDate: value.dueDate,
      addDate: new Date()
    }).subscribe(res => {
      if(res) {
        this.drawerRef.close(this.addInvoiceTemplate);

        this.fetchInvoices(contactId);

        // Reset Fields
        this.addInvoiceForm = this.fb.group({
          number: new FormControl('', [Validators.required]),
          value: new FormControl(''),
          dueDate: new FormControl('', [Validators.required]),
          paid: new FormControl('')
        });
      }
    });
  }

  // Invoice Overdue
  invoiceOverdue(dueDate) {
    let dueDateDate = new Date(dueDate);
    if(this.todayDate.getTime() > dueDateDate.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  // Edit Invoice
  editInvoice(invoice) {
    // Invoices Min Number
    this.invoicesMinNumber = (this.invoices.reduce(function(prev, current) {
      return (prev.number > current.number) ? prev : current;
    }).number + 1);

    // Edit Invoice Form
    this.editInvoiceForm = this.fb.group({
      number: [invoice.number, [Validators.required]],
      value: [invoice.value],
      paid: [invoice.paid],
      dueDate: [invoice.dueDate, [Validators.required]]
    });

    this.drawerRef = this.drawerService.create({
      nzTitle: 'Edit Invoice',
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.editInvoiceTemplate,
      nzContentParams: {
        value: invoice
      }
    });
  }

  // Submit Edit Invoice
  submitEditInvoice(value, invoice) {
    this.contactService.updateInvoice(invoice._id, {
      number: value.number,
      value: value.value,
      paid: value.paid,
      dueDate: value.dueDate
    }).subscribe(res => {
      if(res) {
        this.drawerRef.close(this.editInvoiceTemplate);

        this.fetchInvoices(invoice.contactId);

        // Reset Fields
        this.editInvoiceForm = this.fb.group({
          number: new FormControl('', [Validators.required]),
          value: new FormControl(''),
          paid: new FormControl(''),
          dueDate: new FormControl('', [Validators.required])
        });
      }
    });
  }

  // Update Invoice
  updateInvoice(invoice) {
    this.contactService.updateInvoice(invoice._id, {
      number: invoice.number,
      value: invoice.value,
      paid: invoice.paid,
      dueDate: invoice.dueDate
    }).subscribe(res => {
      //
    });
  }

  deleteInvoice(id) {
    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: 'Confirm Delete Invoice',
      nzContent: 'Are you sure you want to delete this invoice?',
      nzOkText: 'Yes, Delete Invoice',
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        // Delete Invoice
        this.contactService.deleteInvoice(id).subscribe(res => {
          if(res) {
            this.fetchInvoices(this.contact._id);
          }
        });
      }
    });
  }


  // Schedule Event
  scheduleEvent(contact) {
    this.drawerRef = this.drawerService.create({
      nzTitle: 'Schedule Event to ' + contact.fullName,
      nzClosable: false,
      nzWidth: 384,
      nzContent: this.scheduleEventTemplate,
      nzContentParams: {
        value: contact
      }
    });
  }

  // Submit Schedule Event
  submitScheduleEvent(value, contactId) {
    this.contactService.scheduleEvent({
      userId: this.loggedInUser._id,
      contactId: contactId,
      title: value.title,
      startDateTime: value.dateTimeInterval[0],
      endDateTime: value.dateTimeInterval[1],
      type: value.type,
      addDate: new Date()
    }).subscribe(res => {
      if(res) {
        this.drawerRef.close(this.scheduleEventTemplate);

        this.fetchEvents(contactId);

        // Reset Fields
        this.scheduleEventForm = this.fb.group({
          title: new FormControl('', [Validators.required]),
          dateTimeInterval: new FormControl('', [Validators.required]),
          type: new FormControl(null, [Validators.required])
        });
      }
    });
  }

  // Update Event
  updateEvent(event) {
    this.contactService.updateEvent(event._id, {
      title: event.title,
      startDateTime: event.startDateTime,
      endDateTime: event.endDateTime,
      type: event.type
    }).subscribe(res => {
      //
    });
  }

  deleteEvent(id) {
    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: 'Confirm Delete Event',
      nzContent: 'Are you sure you want to delete this event?',
      nzOkText: 'Yes, Delete Event',
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        // Delete Event
        this.contactService.deleteEvent(id).subscribe(res => {
          if(res) {
            this.fetchEvents(this.contact._id);
          }
        });
      }
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
          //
        });
      }
    });
  }


}
