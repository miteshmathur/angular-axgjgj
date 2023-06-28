import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-process-dynamic-form',
  templateUrl: './process-dynamic-form.component.html',
  styleUrls: ['./process-dynamic-form.component.scss'],
})
export class ProcessDynamicFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Output() formSubmitEvent: EventEmitter<any> = new EventEmitter();
  dynamicFormGroup: FormGroup;
  buttonState = 'submit';
  fields = [];
  formDetails = null;
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.formDetails = changes['formData'].currentValue;
    if (this.formDetails[0]) {
      this.buidForm(this.formDetails[0]?.fields);
    }
  }
  getFormControlsFields(formData) {
    const formFields = {};
    let fieldData = {};
    for (const field of formData) {
      formFields[field['name']] = new FormControl('');
      fieldData = {
        name: field['binding'],
        disable: field['readOnly'],
        type: field['code'].toLowerCase(),
        label: field['label'].toLowerCase(),
      };

      this.fields.push(fieldData);
    }
    return formFields;
  }
  buidForm(formData) {
    const formGroupFields = this.getFormControlsFields(formData);
    this.dynamicFormGroup = new FormGroup(formGroupFields);
  }
  onSubmit() {
    this.formSubmitEvent.emit({
      action: 'process',
      formObj: this.dynamicFormGroup,
    });
  }
}
