import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RosterService, Student, Tutor } from './roster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})

export class RosterComponent implements OnInit, OnDestroy {

  constructor(
    private sidenavService: SidenavService,
    private rosterService: RosterService
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('editor', { static: false }) editor: any;

  private subs = new Subscription();
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'password'];
  dataStudents: any;
  dataTutors: any;
  editorData: any;
  userType: any;

  ngOnInit(): void {
    this.subs.add(this.rosterService.getStudents()
      .subscribe((students: Array<Student>) => {
        this.dataStudents = new MatTableDataSource(students)
      }))

    this.subs.add(this.rosterService.getTutors()
      .subscribe((tutors: Array<Tutor>) => {
        this.dataTutors = new MatTableDataSource(tutors)
      }))
  }

  testing(event) {
    console.log(event);
  }

  addStudent() {
    this.userType = 'student';
    this.editor.open()
  }

  addTutor() {
    this.userType = 'tutor';
    this.editor.open()
  }

  editStudent(student: Student) {
    //send drawer component the data to edit
    this.userType = 'student';
    this.rosterService.onEditStudent.next(student)
    this.editor.open()
  }

  editTutor(tutor: Tutor) {
    //send drawer component the data to edit
    this.rosterService.onEditTutor.next(tutor)
    this.userType = 'tutor';
    this.editor.open()
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
