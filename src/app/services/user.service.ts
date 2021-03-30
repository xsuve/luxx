import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  endpoint: string = 'http://localhost:8000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Is Logged In
  isLoggedIn(): boolean {
    let token = this.getTokenCookie();
    if(token) {
      const decoded = jwt_decode(token);
      if(decoded.exp === undefined) {
        return false;
      } else {
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        if(date === undefined) {
          return false;
        } else {
          return (date.valueOf() > new Date().valueOf());
        }
      }
    } else {
      return false;
    }
  }

  // Get Token Cookie
  getTokenCookie() {
    let name = 'luxx_session';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length === 2) return parts.pop().split(';').shift();
  }

  // Get Current User Cookie
  getCurrentUserCookie() {
    let name = 'luxx_current_user';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length === 2) return parts.pop().split(';').shift();
  }

  // Create User
  createUser(user: User): Observable<any> {
    let API_URL = `${this.endpoint}/create`;
    return this.http.post(API_URL, user)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get User By Email
  getUserByEmail(email): Observable<any> {
    let API_URL = `${this.endpoint}/getUserByEmail/${email}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Log In User
  logInUser(email): Observable<any> {
    let API_URL = `${this.endpoint}/logInUser/${email}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Log Out User
  logOutUser() {
    document.cookie = 'luxx_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'luxx_current_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigate(['/']);
  }

  // Get Logged In User
  getLoggedInUser(): any {
    let currentUser = this.getCurrentUserCookie();
    if(currentUser) {
      return JSON.parse(currentUser);
    }
  }

  // Onboard User
  onboardUser(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/onboardUser/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Update User
  updateUser(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/updateUser/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
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
