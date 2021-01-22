import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SidenavService } from '../../shared/sidenav/sidenav.service';

@Component({
  selector: 'app-log-session',
  templateUrl: './log-session.component.html',
  styleUrls: ['./log-session.component.css']
})
export class LogSessionComponent implements OnInit {

  sessionForm: FormGroup
  step = 0 //form placement

  constructor(public sidenavService: SidenavService ) {
    this.sessionForm = new FormGroup({
      studentName: new FormControl(null),
      subject: new FormControl(null),
      date: new FormControl(null),
      time: new FormControl(null),
      prepared: new FormControl(null),
      learningGoals: new FormControl(null),
      observations: new FormControl(null),
      recommendations: new FormControl(null),
      homework: new FormControl(null),
    })
  }

  ngOnInit(): void {
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

}
