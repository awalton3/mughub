import { Component, OnInit, Output, HostListener, OnDestroy, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
//import { UserService } from '../auth/user.service';
//import { User } from '../auth/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mughub-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @Input() navLinks: Array<{ name: String, icon: String}>;
  @Output() closeNav = new Subject();
  //defaultNavLinks = {};
  //defaultNavLinksArr = [];
  user: any;

  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  constructor(/*private userService: UserService,*/ private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //console.log(this.navLinks)
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getDefaultNavLinks();
    //this.defaultNavLinksArr = Object.keys(this.defaultNavLinks);
    this.screenWidth = window.innerWidth;
  }

  getDefaultNavLinks() {
    // this.defaultNavLinks = {
    //   'Roster': [],
    //   'Assignments': [],
    //   'Website': []
    // }
    //this.showSubLinks = false
    // if (this.user.type === 'tutor') {
    //   this.defaultNavLinks = {
    //     'mail': ['inbox', 'sent', 'drafts', 'trash'],
    //     'manage': [],
    //     'hour log': [],
    //     'settings': []
    //   }
    //   this.showSubLinks = false
    // } else {
    //   this.defaultNavLinks = {
    //     'mail': ['inbox', 'sent', 'drafts', 'trash'],
    //     'settings': []
    //   }
    //   this.showSubLinks = true
    // }
  }

  getIconLink(link: string): string {
    switch (link.toLowerCase()) {
      case 'roster': return 'groups';
      case 'assignments': return 'assignment';
      case 'website': return 'web';
      // case 'mail': return 'mail';
      // case 'inbox': return 'inbox';
      // case 'sent': return 'send';
      // case 'drafts': return 'drafts';
      // case 'trash': return 'delete';
      // case 'manage': return 'build';
      // case 'hour log': return 'schedule';
      // case 'settings': return 'settings';
    }
  }

  navigate(link: string) {
    this.router.navigate([link.toLowerCase()], {relativeTo: this.route})
    // if (link === 'mail') {
    //   // this.router.navigate(['mailhub/inbox'], { relativeTo: this.route });
    // }
    // else if (link === 'hour log') {
    //   this.toggleSubLinks('mail');
    //   this.router.navigate(['hour-log'], { relativeTo: this.route });
    //   this.showSubLinks = false;
    // }
    // else {
    //   this.showSubLinks = false;
    //   this.router.navigate([link], { relativeTo: this.route });
    // }
  }

  // navigateToSublink(sublink: string) {
  //   this.showSubLinks = false;
  //   this.router.navigate(['mail'], { relativeTo: this.route, queryParams: { reqDest: sublink } });
  // }

  // toggleSubLinks(link: string) {
  //   if (link === 'mail')
  //     this.showSubLinks = !this.showSubLinks;
  // }

  onClose() {
    this.closeNav.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
