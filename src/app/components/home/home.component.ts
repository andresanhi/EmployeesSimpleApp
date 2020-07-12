import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models/Employee';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private url: string;
  employees: Employee[] = [];
  txtSearched = '';
  errorText = '';
  error = false;
  constructor(
    private employeeServices: EmployeeService,
  ) {
  }

  ngOnInit() {
    console.log(environment.apiUrl);
  }

  getData() {
    if (this.txtSearched.length < 1) {
      this.getAllEmployees();
    } else {
      this.getEmployee(Number(this.txtSearched));
    }
  }

  getAllEmployees() {
    this.employeeServices.getAllEmployee()
    .subscribe(data => {
      this.employees = data;
      console.log(this.employees);
    },
    error => {
      console.log(error);
    });
  }

  getEmployee(id: number) {
    this.employeeServices.getEmployee(id)
    .subscribe(data => {
      this.employees = [];
      this.employees.push(data);
      console.log(this.employees);
    },
    error => {
      console.log(error);
      this.errorText = error;
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      console.log(error);
    });
  }
}
