import { Component, OnInit, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/auth.service';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';

@Component({
  selector: 'roster-add',
  templateUrl: './roster-add.component.html',
  styleUrls: ['./roster-add.component.css']
})
export class RosterAddComponent implements OnInit {

  @Input() studentData?;
  @Output() onDrawerClose = new Subject();

  studentForm: FormGroup = new FormGroup({
    'firstName': new FormControl(null, Validators.required),
    'lastName': new FormControl(null, Validators.required),
    'email': new FormControl(null, Validators.email),
    'subjects': new FormControl(null, Validators.required),
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  })

  constructor(
    private authService: AuthService,
    private snackbarService: SnackBarService) { }

  ngOnInit(): void {
    if (this.studentData) this.prefillForm();
  }

  prefillForm() {
    Object.keys(this.studentData).forEach(key => {
      if (key in this.studentForm) {
        this.studentForm.value[key] = this.studentData[key];
      }
    });
  }

  closeDrawer() {
    this.onDrawerClose.next();
  }

  updateRoster() {
    let form = this.studentForm.value
    this.authService.register(form.username, form.password)
      .then(user => {
        this.updateUserCollection(user.user.uid, form)
      }).catch(error => {
          if (error.code == 'auth/email-already-in-use') {
            console.log(error);
            //get uid corresponding to username@placeholder.com
            //this.updateUserCollection(uid)
          }
      })
  }

  updateUserCollection(uid, userData) {
    this.authService.editUserCollect(uid, userData)
      .then(() => {
        this.closeDrawer();
        this.snackbarService.onOpenSnackBar.next({ message: "Roster Updated", isError: false })
      }).catch(error => console.log(error))
  }

}
