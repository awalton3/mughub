import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAppRoutingModule } from './student-app-routing.module';
import { StudentAppComponent } from './student-app.component';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from '../shared/sidenav/sidenav.module';


@NgModule({
  declarations: [StudentAppComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatSidenavModule,
    SidenavModule,
    StudentAppRoutingModule
  ]
})
export class StudentAppModule { }
