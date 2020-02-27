import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';

const routes: Routes = [
  {path: 'createEmployee',    component: CreateEmployeeComponent},
  {path: 'employeeList', component: EmployeeListComponent},
  {path: 'editEmployee',  component: EditEmployeeComponent},
  {path: '', component: EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
