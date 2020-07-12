import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  urlBase = environment.apiUrl + 'employees/';

  constructor(
    private http: HttpClient,
  ) { }

  getEmployee(id: number): Observable<any> {
    return this.http.get(this.urlBase + id)
    .pipe(
      map((data: Employee) => {
        return data;
      }), catchError ( error => {
        if (error.status === 200) {
            return throwError (error.error.text);
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
