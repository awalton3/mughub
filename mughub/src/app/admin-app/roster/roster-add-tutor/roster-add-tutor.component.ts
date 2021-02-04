import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { RosterService, Tutor } from '../roster.service';

@Component({
  selector: 'roster-add-tutor',
  templateUrl: './roster-add-tutor.component.html',
  styleUrls: ['./roster-add-tutor.component.css']
})
export class RosterAddTutorComponent implements OnInit {

  @Output() onDrawerClose = new Subject();

  tutorForm: FormGroup;
  isEditMode = false;
  tutorToEdit: Tutor;

  constructor(
    private authService: AuthService,
    private rosterService: RosterService) {
    this.tutorForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'active': new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.listenForEditRequests();
    console.log('drawer-initialized')
  }

  listenForEditRequests() {
    this.rosterService.onEditTutor.subscribe(tutor => {
      console.log('editing tutor')
      this.tutorToEdit = Object.assign({}, tutor)
      this.isEditMode = true
      this.tutorForm.patchValue(tutor)
    })
  }

  addTutor() {
    this.authService.registerTutor({ ...this.tutorForm.value })
      .then(onSuccess => {
        this.authService.onSuccess("Tutor added to roster")
        this.closeDrawer()
      })
      .catch(error => console.log(error)) //need more action here
  }

  editTutor() {
    this.authService.getUserByUsername(this.tutorToEdit.username)
      .then(userObj => {
        return this.authService.editUserInFirestore(userObj.docs[0].id, { ...this.tutorForm.value })
      })
      .then(() => {
        this.authService.onSuccess("Tutor successfully updated")
        this.closeDrawer()
      })
      .catch(error => console.log(error)) //need more action here
  }

  closeDrawer() {
    this.isEditMode = false
    this.onDrawerClose.next()
    this.tutorForm.reset()
  }

  updateRoster() {
    console.log(this.tutorForm.value)
    this.isEditMode ? this.editTutor() : this.addTutor()
  }
}
