import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
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
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rosterService: RosterService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
  }

}
