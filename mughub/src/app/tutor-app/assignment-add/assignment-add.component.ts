import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assignment-add',
  templateUrl: './assignment-add.component.html',
  styleUrls: ['./assignment-add.component.css']
})
export class AssignmentAddComponent implements OnInit {

  assignmentForm: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.assignmentForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'link': new FormControl(null, Validators.required),
      'instructions': new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {}

}
