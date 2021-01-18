import { Component, OnInit, Input, Output } from '@angular/core';
import { RosterService } from '../roster.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-roster-table',
  templateUrl: './roster-table.component.html',
  styleUrls: ['./roster-table.component.css']
})
export class RosterTableComponent implements OnInit {

  @Input() data: any;
  @Input() displayedColumns;
  @Output() onRowClick = new Subject();

  //test = 'this is a test.';

  constructor(private rosterService: RosterService) { }

  ngOnInit(): void {
    console.log("Table data: ", this.data);
  }

  onEditStudent() {
    this.onRowClick.next()
  }

  // editStudent(student) {
  //   console.log(student)
  //   //send drawer component the data to edit
  //   // this.rosterService.onEditStudent.next(student)
  //   // this.editor.open()
  // }

}
