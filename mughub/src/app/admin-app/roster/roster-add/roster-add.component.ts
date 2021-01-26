import { Component, OnInit, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { RosterService, Student, Tutor } from '../roster.service';
import { RosterComponent } from '../roster.component';

@Component({
  selector: 'roster-add',
  templateUrl: './roster-add.component.html',
  styleUrls: ['./roster-add.component.css']
})
export class RosterAddComponent implements OnInit {

  @Output() onDrawerClose = new Subject();
  @Input() userType: string;

  studentForm: FormGroup;
  tutorForm: FormGroup;
  // subjectForm: FormGroup;
  isEditMode = false;
  studentToEdit: Student;
  tutorToEdit: Tutor;
  subjects: Array<{ subject: string, tutor: string }> = [];
  @ViewChild('subjectName') subjectNameInput: ElementRef;
  @ViewChild('subjectTutor') subjectTutorInput: ElementRef;

  constructor(
    private authService: AuthService,
    private rosterService: RosterService) {

    this.studentForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email),
      // 'subjects': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'parentFirstName': new FormControl(null, Validators.required),
      'parentLastName': new FormControl(null, Validators.required),
      'parentEmail': new FormControl(null, Validators.email),
      'gradeLevel': new FormControl(null),
      'active': new FormControl(null),
      'type': new FormControl(null)
      // 'phone': new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}")])
    })
    // this.subjectForm = new FormGroup({
    //   'subject': new FormGroup(null, Validators.required),
    //   'tutor': new FormGroup(null, Validators.required)
    // })
    this.tutorForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email),
      // 'subjects': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'active': new FormControl(null),
      'type': new FormControl(null)
      // 'phone': new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}")])
    })
  }

  ngOnInit(): void {
    this.listenForEditRequests();
  }

  listenForEditRequests() {
    this.rosterService.onEditStudent.subscribe(student => {
      this.studentToEdit = Object.assign({}, student)
      this.isEditMode = true
      this.studentForm.patchValue(student)
      this.subjects = student.subjects
    })
  }

  addStudent() {
    if (this.userType == 'student') {
      let subjects = { subjects: this.subjects }
      this.authService.registerStudent({ ...this.studentForm.value, ...subjects })
        .then(onSuccess => {
          this.authService.onSuccess("Student added to roster")
          this.closeDrawer()
        })
        .catch(error => console.log(error)) //need more action here
    }
    else if (this.userType == 'tutor'){
      this.authService.registerTutor({ ...this.tutorForm.value })
      .then(onSuccess => {
        this.authService.onSuccess("Tutor added to roster")
        this.closeDrawer()
      })
      .catch(error => console.log(error)) //need more action here
    }
  }

  editStudent() {
    if (this.userType == 'student'){
      this.authService.getUserByUsername(this.studentToEdit.username)
        .then(userObj => {
          let subjects = { subjects: this.subjects }
          this.authService.editUserInFirestore(userObj.docs[0].id, {...this.studentForm.value, ...subjects})
          this.authService.onSuccess("Student successfully updated")
          this.closeDrawer()
        })
        .catch(error => console.log(error)) //need more action here
    }
    else if (this.userType == 'tutor'){
      this.authService.getUserByUsername(this.tutorToEdit.username)
      .then(userObj => {
        this.authService.editUserInFirestore(userObj.docs[0].id, {...this.tutorForm.value})
        this.authService.onSuccess("Tutor successfully updated")
        this.closeDrawer()
      })
      .catch(error => console.log(error)) //need more action here
    }
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
    console.log(this.studentForm.value)
    this.isEditMode ? this.editStudent() : this.addStudent()
  }
}
