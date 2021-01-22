import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../shared/sidenav/sidenav.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(public sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

}
