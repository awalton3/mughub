import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorAppComponent } from './tutor-app.component';
import { StudentsComponent } from './students/students.component';
import { LogSessionComponent } from './log-session/log-session.component';

const routes: Routes = [
  { path: '', component: TutorAppComponent, children: [
    { path: '', redirectTo: 'students', pathMatch: 'full'},
    { path: 'students', component: StudentsComponent },
    { path: 'log', component: LogSessionComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorAppRoutingModule { }
