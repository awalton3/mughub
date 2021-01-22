import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorAppComponent } from './tutor-app.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: '', component: TutorAppComponent, children: [
    { path: '', redirectTo: 'students', pathMatch: 'full'},
    { path: 'students', component: StudentsComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorAppRoutingModule { }
