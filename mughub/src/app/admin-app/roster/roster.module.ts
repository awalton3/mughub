import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RosterRoutingModule } from './roster-routing.module';
import { RosterComponent } from './roster.component';
import { HeadnavModule } from '../../shared/headnav/headnav.module';

@NgModule({
  declarations: [RosterComponent],
  imports: [
  CommonModule,
    RosterRoutingModule,
    HeadnavModule
  ]
})
export class RosterModule { }
