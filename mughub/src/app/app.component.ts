import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { SnackBarService } from './shared/snack-bar/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private subs = new Subscription();
  loading = true;
  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private snackBar: MatSnackBar) {
      router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd) {
          this.loading = false;
        } else if (event instanceof NavigationError) {
          this.loading = false;
        } else if (event instanceof NavigationCancel) {
          this.loading = false;
        }
      });
    }

  title = 'mughub';

  ngOnInit() {
    this.checkAuthorization();
    this.listenForSnackBarOpen();
    this.listenForSnackBarClose();
  }

  checkAuthorization() {
    this.subs.add(firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.router.navigate(['login'])
        sessionStorage.clear()
      }
    }));
  }

  listenForSnackBarOpen() {
    this.subs.add(this.snackBarService.onOpenSnackBar.subscribe(data =>
      this.openSnackbar({ message: data.message, isError: data.isError })));
  }

  listenForSnackBarClose() {
    this.subs.add(this.snackBarService.onCloseSnackBar.subscribe(() => this.snackBar.dismiss()));
  }

  openSnackbar(data: any) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      data: data
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
