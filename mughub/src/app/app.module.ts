import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialComponentsModule } from './shared/angular-material/material-components.module';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormsMaterialComponentsModule } from './shared/angular-material/forms-material-components.module';

import { AuthComponent } from './auth/auth.component';

//Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Firebase Credentials
const firebaseConfig = {
  apiKey: "AIzaSyAc5YqLrFdZ2h00dTwS-9Y19qXaiFz86m8",
  authDomain: "mughub-8a92e.firebaseapp.com",
  projectId: "mughub-8a92e",
  storageBucket: "mughub-8a92e.appspot.com",
  messagingSenderId: "1081972173425",
  appId: "1:1081972173425:web:898811afd01f66fbbe89d0",
  measurementId: "G-RB10CD35RC"
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
