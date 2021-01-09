import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAppRoutingModule } from './admin-app-routing.module';
import { AdminAppComponent } from './admin-app.component';

import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from '../shared/sidenav/sidenav.module';

@NgModule({
  declarations: [AdminAppComponent],
  imports: [
CommonModule,
    MaterialComponentsModule,
    MatSidenavModule,
    SidenavModule,
    AdminAppRoutingModule
  ]
})
export class AdminAppModule { }
