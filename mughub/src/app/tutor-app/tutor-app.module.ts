import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorAppRoutingModule } from './tutor-app-routing.module';
import { TutorAppComponent } from './tutor-app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from '../shared/sidenav/sidenav.module';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [TutorAppComponent, StudentsComponent],
  imports: [
    CommonModule,
    TutorAppRoutingModule,
    MatSidenavModule,
    SidenavModule
  ]
})
export class TutorAppModule { }
