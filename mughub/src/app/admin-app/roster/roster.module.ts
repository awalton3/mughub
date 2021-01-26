import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RosterRoutingModule } from './roster-routing.module';
import { RosterComponent } from './roster.component';
import { HeadnavModule } from '../../shared/headnav/headnav.module';

import { FormsMaterialComponentsModule } from 'src/app/shared/angular-material/forms-material-components.module';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { RosterAddComponent } from './roster-add/roster-add.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RosterTableComponent } from './roster-table/roster-table.component';
import { RosterAddTutorComponent } from './roster-add-tutor/roster-add-tutor.component';

@NgModule({
  declarations: [RosterComponent, RosterAddComponent, RosterTableComponent, RosterAddTutorComponent],
  imports: [
    MatSelectModule,
    CommonModule,
    RosterRoutingModule,
    HeadnavModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatCardModule,
    FormsMaterialComponentsModule,
    MaterialComponentsModule
  ]
})
export class RosterModule { }
