import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { SidenavService } from '../shared/sidenav/sidenav.service';

@Component({
  selector: 'app-tutor-app',
  templateUrl: './tutor-app.component.html',
  styleUrls: ['./tutor-app.component.css']
})
export class TutorAppComponent implements OnInit {

  private subs = new Subscription();

  @ViewChild('navDrawer', { static: false }) navDrawer: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustSidenav();
  }

  loading: boolean = true;
  views =  [
    { name: 'Students', faIcon: 'users' },
    { name: 'Sessions', faIcon: 'clipboard-list', link: 'sessions' },
  ]

  constructor(private sidenavService: SidenavService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      } else if (event instanceof NavigationError) {
        this.loading = false;
      } else if (event instanceof NavigationCancel) {
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.subs.add(this.sidenavService.onToggle.subscribe(() => this.navDrawer.toggle()));
  }

  ngAfterViewInit() {
    this.adjustSidenav();
  }

  adjustSidenav() {
    if (window.innerWidth < 960) {
      this.navDrawer.opened = false;
      this.navDrawer.mode = 'over';
    } else {
      this.navDrawer.opened = true;
      this.navDrawer.mode = 'side';
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
