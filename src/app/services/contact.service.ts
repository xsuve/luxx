import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Contact } from '../models/contact.model';
import { Task } from '../models/task.model';
import { Note } from '../models/note.model';
import { Invoice } from '../models/invoice.model';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  endpoint: string = 'http://localhost:8000/contact';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Get Contacts
  // getContacts() {
  //   return this.http.get(`${this.endpoint}`);
  // }

  // Get Contacts
  getContacts(userId): Observable<Contact[]> {
    let API_URL = `${this.endpoint}/${userId}`;
    return this.http.get<Contact[]>(API_URL, { headers: this.headers });
  }

  // Create Contact
  createContact(contact: Contact): Observable<any> {
    let API_URL = `${this.endpoint}/create`;
    return this.http.post(API_URL, contact)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get Contact
  getContact(id): Observable<any> {
    let API_URL = `${this.endpoint}/contact/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Contact
  updateContact(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Contact
  deleteContact(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Add Task
  addTask(task: Task): Observable<any> {
    let API_URL = `${this.endpoint}/addtask`;
    return this.http.post(API_URL, task)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get Tasks
  getTasks(contactId): Observable<Task[]> {
    let API_URL = `${this.endpoint}/tasks/${contactId}`;
    return this.http.get<Task[]>(API_URL, { headers: this.headers });
  }

  // Get Task
  getTask(id): Observable<any> {
    let API_URL = `${this.endpoint}/task/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Task
  updateTask(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/updatetask/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Task
  deleteTask(id): Observable<any> {
    var API_URL = `${this.endpoint}/deletetask/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Add Note
  addNote(note: Note): Observable<any> {
    let API_URL = `${this.endpoint}/addnote`;
    return this.http.post(API_URL, note)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get Notes
  getNotes(contactId): Observable<Note[]> {
    let API_URL = `${this.endpoint}/notes/${contactId}`;
    return this.http.get<Note[]>(API_URL, { headers: this.headers });
  }

  // Update Note
  updateNote(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/updatenote/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Note
  deleteNote(id): Observable<any> {
    var API_URL = `${this.endpoint}/deletenote/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }



  // Get Invoices
  getInvoices(contactId): Observable<Invoice[]> {
    let API_URL = `${this.endpoint}/invoices/${contactId}`;
    return this.http.get<Invoice[]>(API_URL, { headers: this.headers });
  }

  // Add Invoice
  addInvoice(invoice: Invoice): Observable<any> {
    let API_URL = `${this.endpoint}/addinvoice`;
    return this.http.post(API_URL, invoice)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Update Invoice
  updateInvoice(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/updateinvoice/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Invoice
  deleteInvoice(id): Observable<any> {
    var API_URL = `${this.endpoint}/deleteinvoice/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Get Events
  getEvents(contactId): Observable<Event[]> {
    let API_URL = `${this.endpoint}/events/${contactId}`;
    return this.http.get<Event[]>(API_URL, { headers: this.headers });
  }

  // Schedule Event
  scheduleEvent(event: Event): Observable<any> {
    let API_URL = `${this.endpoint}/scheduleevent`;
    return this.http.post(API_URL, event)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Update Event
  updateEvent(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/updateevent/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Event
  deleteEvent(id): Observable<any> {
    var API_URL = `${this.endpoint}/deleteevent/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
