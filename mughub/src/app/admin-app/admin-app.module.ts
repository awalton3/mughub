import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAppRoutingModule } from './admin-app-routing.module';
import { AdminAppComponent } from './admin-app.component';
import { ResourcesComponent } from './resources/resources.component';

import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from '../shared/sidenav/sidenav.module';
import { HeadnavModule } from '../shared/headnav/headnav.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { ResourceAddComponent } from './resources/resource-add/resource-add.component';
import { FormsMaterialComponentsModule } from '../shared/angular-material/forms-material-components.module';


@NgModule({
  declarations: [AdminAppComponent, ResourcesComponent, ResourceAddComponent],
  imports: [
  CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    MatSidenavModule,
    SidenavModule,
    AdminAppRoutingModule,
    HeadnavModule,
    MatExpansionModule,
    MatDialogModule,
  ]
})
export class AdminAppModule { }
