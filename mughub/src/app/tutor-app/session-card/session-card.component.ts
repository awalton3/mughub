import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.css']
})
export class SessionCardComponent implements OnInit {

  @Input() session: any;
  goals = []

  constructor() { }

  ngOnInit(): void {
    this.goals = this.session.learningGoals.split("\n")
  }

}
