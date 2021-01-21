import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/sidenav/sidenav.service';
import { MatDialog } from '@angular/material/dialog';
import { ResourceAddComponent } from './resource-add/resource-add.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor(public sidenavService: SidenavService, public dialog: MatDialog) { }

  resourceGroups = [
    {title: 'Elementary School', description: 'Grade 1 - 5'},
    {title: 'Middle School', description: 'Grade 6 - 8'},
    {title: 'High School', description: 'Grade 9 - 12'},
    {title: 'Adult Learning'}
  ]

  ngOnInit(): void {
  }

  openAddDialog(resourceGroup: string) {
    this.dialog.open(ResourceAddComponent, {
      data: {
        resourceGroup: resourceGroup
      }
    });
  }

}
