import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card.component';
import { MatCardModule } from '@angular/material/card';
import { MaterialComponentsModule } from '../angular-material/material-components.module';


@NgModule({
  declarations: [ProfileCardComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatCardModule
  ],
  exports: [ProfileCardComponent]
})
export class ProfileCardModule { }
