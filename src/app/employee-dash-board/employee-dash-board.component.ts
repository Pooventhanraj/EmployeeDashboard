import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { EmployeeModel } from './employee-dash-board.model';
import{ApiService} from '../shared/api.service'

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {

  formValue !: FormGroup
  employee : EmployeeModel =  new EmployeeModel();
  employeeData: any;
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }
  showAdd !:boolean;
  showUpdate !:boolean;

  ngOnInit(): void {
    this.formValue =this.formBuilder.group(
      {
        firstName:[''],
        lastName:[''],
        email:[''],
        mobile:[''],
        salary:[''],

      }
    )  
    this.getEmployeeDetails(); 
  }
  postEmployeeDetails(){
    this.employee.firstName=this.formValue.value.firstName;
    this.employee.lastName=this.formValue.value.lastName;
    this.employee.email=this.formValue.value.email;
    this.employee.mobile=this.formValue.value.mobile;
    this.employee.salary=this.formValue.value.salary;

    this.api.postEmployee(this.employee)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added sucessfully");
      let ref = document.getElementById('close');
      ref?.click();
      this.formValue.reset();   
    })
    this.getEmployeeDetails();
      
  }

  getEmployeeDetails(){
    this.api.getEmployee()
    .subscribe(res=>{
      console.log(res);
     this.employeeData =res;
    })
  }

  DeleteEmployeeDetails(row:any){
    console.log(row);
    this.api.deletEmployee(row.id)
    .subscribe(res=>
    {
      alert("Sucessfully Deleted the record of "+row.firstName +" from the table");
    })
    this.getEmployeeDetails();
  }

  onEdit(row:any)
  {
    this.employee.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
     this.formValue.controls['salary'].setValue(row.salary);

     this.showUpdate=true;
     this.showAdd=false;

  }

  UpdateEmployeeDetails()
  {
    this.employee.firstName=this.formValue.value.firstName;
    this.employee.lastName=this.formValue.value.lastName;
    this.employee.email=this.formValue.value.email;
    this.employee.mobile=this.formValue.value.mobile;
    this.employee.salary=this.formValue.value.salary;

    this.api.updateEmployee(this.employee , this.employee.id)
    .subscribe(res =>
      {
        alert("successfully updated the record");
        let ref = document.getElementById('close');
        ref?.click();
        this.formValue.reset();   
        this.getEmployeeDetails();
      })
      
  }

  onAdd()
  {
    this.formValue.reset();
    this.showUpdate=false;
    this.showAdd=true;
    
  }



}
