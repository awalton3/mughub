import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  title = 'mughub';

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.router.navigate(['login'])
        sessionStorage.clear()
      }
    });
  }

}
