import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorAppRoutingModule } from './tutor-app-routing.module';
import { TutorAppComponent } from './tutor-app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from '../shared/sidenav/sidenav.module';
import { StudentsComponent } from './students/students.component';
import { HeadnavModule } from '../shared/headnav/headnav.module';
import { ProfileCardModule } from '../shared/profile-card/profile-card.module';
import { MaterialComponentsModule } from '../shared/angular-material/material-components.module';
import { FormsMaterialComponentsModule } from '../shared/angular-material/forms-material-components.module';
import { LogSessionComponent } from './log-session/log-session.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUserGraduate, faInfoCircle, faLightbulb, faBook, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [TutorAppComponent, StudentsComponent, LogSessionComponent],
  imports: [
  CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    TutorAppRoutingModule,
    MatSidenavModule,
    SidenavModule,
    HeadnavModule,
    ProfileCardModule,
    FontAwesomeModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class TutorAppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUserGraduate, faInfoCircle, faClipboardList, faLightbulb, faBook)
  }
}
