import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RosterService, Student } from './roster.service';
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
  displayedColumns: string[] = ['name', 'username', 'password'];
  dataSource: any;
  editorData: any;


  ngOnInit(): void {
    this.subs.add(this.rosterService.getStudents()
      .subscribe((students: Array<Student>) => {
        this.dataSource = new MatTableDataSource(students)
        this.dataSource.sort = this.sort;
      }))
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  editStudent(student: Student) {
    //send drawer component the data to edit
    this.rosterService.onEditStudent.next(student)
    this.editor.open()
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
