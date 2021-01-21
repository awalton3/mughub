import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-resource-add',
  templateUrl: './resource-add.component.html',
  styleUrls: ['./resource-add.component.css']
})
export class ResourceAddComponent implements OnInit {

  addResourceForm: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.addResourceForm = new FormGroup({
      'resourceGroup': new FormControl(null, Validators.required),
      'title': new FormControl(null, Validators.required),
      'link': new FormControl(null),
      'description': new FormControl(null),
    })
  }

  addResource() {

  }

  ngOnInit(): void {
    console.log(this.data)
  }

}
