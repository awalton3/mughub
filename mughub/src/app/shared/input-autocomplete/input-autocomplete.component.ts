import { Component, OnInit, OnDestroy, forwardRef, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css'],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputAutocompleteComponent),
			multi: true,
    }
  ]
})
export class InputAutocompleteComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() formLabel: string;
  @Input() autocompleteOptions: Array<any>;

  public formChanged = new EventEmitter<any>();
  public inputAutoCompleteForm = new FormGroup({
    'genericInput': new FormControl(null, Validators.required),
  })
  public formSubscription$: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.formSubscription$ = this.onFormChange().subscribe(val => {
      this.formChanged.emit(val);
    });
  }

  onFormChange() {
    return this.inputAutoCompleteForm.valueChanges;
  }

  registerOnChange(fn: any): void {
    this.formChanged.subscribe(fn);
  }

  writeValue(controls): void {
    console.log(controls);
  }

  registerOnTouched(fn: any): void {}

  ngOnDestroy() {
    this.formSubscription$ && this.formSubscription$.unsubscribe();
  }
}
