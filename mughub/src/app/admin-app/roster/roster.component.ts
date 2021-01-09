import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../shared/sidenav/sidenav.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }
}
