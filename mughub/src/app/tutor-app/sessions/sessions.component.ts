import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TutorService } from '../tutor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { SidenavService } from 'src/app/shared/sidenav/sidenav.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit, OnDestroy {

  private subs = new Subscription()
  sessions = []
  loading = true
  sessionsByDate = {}
  @ViewChild('editor', { static: false }) editor: any;

  constructor(
    private tutorService: TutorService,
    private authService: AuthService,
    public sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.subs.add(this.tutorService.getSessions(this.authService.getUserSession().username)
      .subscribe((sessions: Array<any>) => {
        this.loading = false
        this.sessions = sessions
        this.groupBy('generalDate')
        console.log(Object.keys(this.sessionsByDate))
      }))
  }

  editSession(session) {
    this.tutorService.onEditSession.next(session) //send data to session drawer
    this.editor.open();
  }

  groupBy(attribute: string) {
    this.sessionsByDate = this.sessions.reduce((r, session) => {
      r[session[attribute]] = [...r[session[attribute]] || [], session]
      return r
    }, {})
  }

  getDate(date: string) {
    return new Date(date)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
