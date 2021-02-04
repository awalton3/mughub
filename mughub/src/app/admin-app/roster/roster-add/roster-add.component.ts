import { Component, OnInit, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
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
  @Input() userType: string;

  private subs = new Subscription();
  studentForm: FormGroup;
  isEditMode = false;
  studentToEdit: Student;
  subjects: Array<{ subject: string, tutor: string }> = [];
  @ViewChild('subjectName') subjectNameInput: ElementRef;
  @ViewChild('subjectTutor') subjectTutorInput: ElementRef;

  constructor(
    private authService: AuthService,
    private rosterService: RosterService) {

    //Initialize student form
    this.studentForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'gradeLevel': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'parentFirstName': new FormControl(null, Validators.required),
      'parentLastName': new FormControl(null, Validators.required),
      'parentEmail': new FormControl(null, Validators.email),
      'parentPhone': new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'active': new FormControl(null)
    })

    //Listen for edit requests
    // this.subs.add(this.rosterService.onEditStudent.subscribe(student => {
    //   console.log('in edit student')
    //   this.studentToEdit = Object.assign({}, student)
    //   this.isEditMode = true
    //   this.studentForm.patchValue(student)
    //   this.subjects = student.subjects
    // }))
  }

  ngOnInit(): void {
    this.listenForEditRequests();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  listenForEditRequests() {
    this.rosterService.onEditStudent.subscribe(student => {
      console.log('in add student')
      this.studentToEdit = Object.assign({}, student)
      this.isEditMode = true
      this.studentForm.patchValue(student)
      this.subjects = student.subjects
    })
  }

  // addStudent() {
  //   let subjects = { subjects: this.subjects }
  //   this.authService.registerStudent({ ...this.studentForm.value, ...subjects })
  //     .then(onSuccess => {
  //       this.authService.addStudentToGoogleSheets(this.studentForm.value)
  //         .then(onSuccess => {
  //           this.authService.onSuccess("Student added to roster")
  //           this.closeDrawer()
  //         }).catch(error => console.log(error))
  //     })
  //     .catch(error => console.log(error)) //need more action here
  // }

  addStudent() {
    let subjects = { subjects: this.subjects }
    this.authService.registerStudent({ ...this.studentForm.value, ...subjects })
      .then(onSuccess => {
        return this.authService.addStudentToGoogleSheets(this.studentForm.value)
      })
      .then(onSuccess => {
        this.authService.onSuccess("Student added to roster")
        this.closeDrawer()
      })
      .catch(error => console.log(error)) //need more action here
  }

  editStudent() {
    this.authService.getUserByUsername(this.studentToEdit.username)
      .then(userObj => {
        let subjects = { subjects: this.subjects }
        this.authService.editUserInFirestore(userObj.docs[0].id, { ...this.studentForm.value, ...subjects })
        this.authService.onSuccess("Student successfully updated")
        this.closeDrawer()
      })
      .catch(error => console.log(error)) //need more action here
  }

  addSubject() {
    //Check if fields are empty
    let subjectName = this.subjectNameInput.nativeElement.value
    let subjectTutor = this.subjectTutorInput.nativeElement.value
    if (!subjectName || !subjectTutor) return;
    //Add subjects to array
    this.subjects.push({
      subject: subjectName,
      tutor: subjectTutor
    })
    //Reset fields
    this.subjectNameInput.nativeElement.value = ""
    this.subjectTutorInput.nativeElement.value = ""
  }

  removeSubject(idx) {
    this.subjects.splice(idx, 1)
  }

  closeDrawer() {
    this.isEditMode = false
    this.onDrawerClose.next()
    this.studentForm.reset()
    this.subjects = []
  }

  updateRoster() {
    this.isEditMode ? this.editStudent() : this.addStudent()
  }
}
