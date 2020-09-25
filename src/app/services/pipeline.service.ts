import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Contact } from '../models/contact.model';
import { Pipeline } from '../models/pipeline.model';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {

  endpoint: string = 'http://localhost:8000/pipeline';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Get Pipelines
  getPipelines(userId): Observable<Pipeline[]> {
    let API_URL = `${this.endpoint}/${userId}`;
    return this.http.get<Pipeline[]>(API_URL, { headers: this.headers });
  }

  // Create Pipeline
  createPipeline(pipeline: Pipeline): Observable<any> {
    let API_URL = `${this.endpoint}/create`;
    return this.http.post(API_URL, pipeline)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get Pipeline
  getPipeline(id): Observable<any> {
    let API_URL = `${this.endpoint}/pipeline/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Pipeline
  updatePipeline(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Pipeline
  deletePipeline(id): Observable<any> {
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
