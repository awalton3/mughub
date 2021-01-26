import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    private tutorService: TutorService,
    private authService: AuthService,
    public sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.subs.add(this.tutorService.getSessions(this.authService.getUserSession().username)
      .subscribe((sessions: Array<any>) => {
        this.loading = false
        this.sessions = sessions
        console.log(this.sessions)
      }))
  }

  editSession(session) {
    this.tutorService.onEditSession.next(session) //send data to session drawer
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
