import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  endpoint: string = 'http://localhost:8000/company';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Get Companies
  // getCompanies() {
  //   return this.http.get(`${this.endpoint}`);
  // }

  // Get Companies
  getCompanies(userId): Observable<Company[]> {
    let API_URL = `${this.endpoint}/${userId}`;
    return this.http.get<Company[]>(API_URL, { headers: this.headers });
  }

  // Create Company
  createCompany(company: Company): Observable<any> {
    let API_URL = `${this.endpoint}/create`;
    return this.http.post(API_URL, company)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get Company
  getCompany(id): Observable<any> {
    let API_URL = `${this.endpoint}/company/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Company
  updateCompany(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Company
  deleteCompany(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete/${id}`;
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
