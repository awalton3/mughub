import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatTabsModule
  ]
})

export class MaterialComponentsModule { }
