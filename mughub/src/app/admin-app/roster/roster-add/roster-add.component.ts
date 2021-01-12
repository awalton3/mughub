import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { RosterService, Student } from '../roster.service';

@Component({
  selector: 'roster-add',
  templateUrl: './roster-add.component.html',
  styleUrls: ['./roster-add.component.css']
})
export class RosterAddComponent implements OnInit {

  @Output() onDrawerClose = new Subject();

  studentForm: FormGroup = new FormGroup({
    'firstName': new FormControl(null, Validators.required),
    'lastName': new FormControl(null, Validators.required),
    'email': new FormControl(null, Validators.email),
    'subjects': new FormControl(null, Validators.required),
    // 'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  isEditMode = false;
  studentToEdit: Student;

  constructor(
    private authService: AuthService,
    private rosterService: RosterService) { }

  ngOnInit(): void {
    this.listenForEditRequests();
  }

  listenForEditRequests() {
    this.rosterService.onEditStudent.subscribe(student => {
      this.studentToEdit = Object.assign({}, student)
      this.isEditMode = true
      this.studentForm.patchValue(student)
    })
  }

  addStudent() {
    this.authService.registerStudent(this.studentForm.value)
      .then(onSuccess => {
        this.authService.onSuccess("Student added to roster")
        this.closeDrawer()
      })
      .catch(error => console.log(error)) //need more action here
  }

  editStudent() {
      this.authService.getUserByUsername(this.studentToEdit.username)
        .then(userObj => {
          this.authService.editUserInFirestore(userObj.docs[0].id, this.studentForm.value)
          this.authService.onSuccess("Student successfully updated")
          this.closeDrawer()
        })
        .catch(error => console.log(error)) //need more action here
  }

  closeDrawer() {
    this.isEditMode = false
    this.onDrawerClose.next()
    this.studentForm.reset()
  }

  updateRoster() {

    this.isEditMode ? this.editStudent() : this.addStudent()

    //Get username
    // this.recommendUsername(form.firstName, form.lastName)
    //   .then(username => {

    //     let usernameObj = { username: username }

    //     // Register new user
    //     this.authService.register(username, form.password)
    //       .then(user => {
    //         this.updateUserCollection(user.user.uid, { ...form, ...userType, ...usernameObj })
    //       })
    //       .catch(error => {
    //         // Update exisiting user
    //         if (error.code == 'auth/email-already-in-use') {
    //           this.authService.getUserByUsername(form.username)
    //             .then(userObj => this.updateUserCollection(userObj.docs[0].id, { ...form, ...userType }));
    //         }
    //       })
    //   }).catch(error => console.log(error))
  }

  // updateUserCollection(uid, userData) {
  //   this.authService.editUserCollect(uid, userData)
  //     .then(() => {
  //       this.closeDrawer();
  //       this.snackbarService.onOpenSnackBar.next({ message: "Roster Updated", isError: false })
  //     }).catch(error => console.log(error))
  // }

  // recommendUsername(firstname, lastname) {
  //   let name = firstname + lastname;
  //   return this.rosterService.getStudentsOrderByUsername(name)
  //     .then(matches => {
  //       if (matches.docs.length == 0)
  //         return Promise.resolve(name)
  //       let nums = matches.docs.map(match => {
  //         return Number(match.data().username.substring(name.length))
  //       })
  //       //this.recommendUsername = name + (Math.max(...nums) + 1)
  //       return Promise.resolve(name + (Math.max(...nums) + 1))
  //     }).catch(error => { return Promise.reject() })
  // }




    // prefillForm(student) {
  //   this.studentForm.patchValue(student)
  //   // delete student['type']
  //   // Object.keys(student).forEach(key => {
  //   //   if (key in this.studentForm) {
  //   //     this.studentForm.get(key).setValue(student[key]);
  //   //   }
  //   // });
  // }


}
