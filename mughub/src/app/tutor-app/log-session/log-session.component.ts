import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentAddComponent } from '../assignment-add/assignment-add.component';
import { TutorService } from '../tutor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-log-session',
  templateUrl: './log-session.component.html',
  styleUrls: ['./log-session.component.css']
})
export class LogSessionComponent implements OnInit {

  sessionForm: FormGroup
  step = 0 //form placement
  assignments = []
  isEditMode = false
  sessionToEdit: any
  @Output() onDrawerClose = new Subject()

  constructor(
    public sidenavService: SidenavService,
    public dialog: MatDialog,
    private authService: AuthService,
    public tutorService: TutorService) {
    this.sessionForm = new FormGroup({
      studentName: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      time: new FormControl(null, Validators.required),
      prepared: new FormControl(null, Validators.required),
      learningGoals: new FormControl(null, Validators.required),
      observations: new FormControl(null, Validators.required),
      recommendations: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.listenForEditRequests()
  }

  listenForEditRequests() {
    this.tutorService.onEditSession.subscribe(sessionToEdit => {
      this.isEditMode = true;
      sessionToEdit.date = new Date(sessionToEdit.date.seconds * 1000) //create date object in miliseconds
      this.sessionForm.patchValue(sessionToEdit) //prefill form
      this.assignments = sessionToEdit.homework
      this.sessionToEdit = sessionToEdit
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  checkSectionValid(section) {
    let form = this.sessionForm.controls
    switch(section) {
      case 'info':
        return (
        form.studentName.status === "VALID" &&
        form.date.status === "VALID" &&
        form.time.status === "VALID" &&
        form.subject.status === "VALID")
      case 'goals':
        return form.learningGoals.status === "VALID"
      case 'reflection':
        return (
        form.observations.status === "VALID" &&
        form.recommendations.status === "VALID")
      case 'homework':
        return this.assignments.length
      default: return false
    }
  }

  onAddAssignment() {
    const dialogRef = this.dialog.open(AssignmentAddComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(assignment => {
      if (assignment) this.assignments.push(assignment)
    });
  }

  removeAssignment(index) {
    this.assignments.splice(index, 1)
  }

  closeDrawer() {
    this.isEditMode = false
    this.onDrawerClose.next()
    this.sessionForm.reset()
    this.assignments = []
  }

  submitSession() {
    let other = { homework: this.assignments, tutorUsername: this.authService.getUserSession().username  }
    this.tutorService.submitSession({ ...this.sessionForm.value, ...other })
    this.closeDrawer()
  }

  deleteSession() {
    if (confirm('Are you sure you would like to delete this session?')) {
      this.tutorService.deleteSession(this.sessionToEdit.id)
    }
  }
}
