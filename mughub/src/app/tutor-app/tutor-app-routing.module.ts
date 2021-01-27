import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorAppComponent } from './tutor-app.component';
import { StudentsComponent } from './students/students.component';
import { SessionsComponent } from './sessions/sessions.component';

const routes: Routes = [
  { path: '', component: TutorAppComponent, children: [
    { path: '', redirectTo: 'sessions', pathMatch: 'full'},
    { path: 'students', component: StudentsComponent },
    { path: 'sessions', component: SessionsComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorAppRoutingModule { }
