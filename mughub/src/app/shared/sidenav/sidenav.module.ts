import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './sidenav.component';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { RouterModule } from '@angular/router';

//Font-awesome icons
import { faClipboardList, faUsers, faUserShield, faChalkboardTeacher, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

/* MUST IMPORTANT FA ICONS BELOW IN CONSTRUCTOR */

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatListModule,
    RouterModule,
    FontAwesomeModule

  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule {
  constructor(private library: FaIconLibrary) {
     //font-awesome icons
     library.addIcons(faClipboardList, faUsers, faUserShield, faChalkboardTeacher, faUserGraduate)
  }
}
