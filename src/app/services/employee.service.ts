import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Employee } from '../models/Employee';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  urlBase = environment.apiUrl + 'employees/';

  constructor(
    private http: HttpClient,
  ) {
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(this.urlBase + id)
    .pipe(
      map((data: Employee) => {
        return data;
      }), catchError ( error => {
        if (error.status === 404) {
            console.log(error);
            return throwError (error.error.message);
        } else {
          return throwError ('Something went wrong');
        }
      })
    );
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(this.urlBase)
    .pipe(
      map((data: Employee[]) => {
        return data;
      }), catchError ( error => {
        return throwError ('Something went wrong');
      })
    );
  }
}
