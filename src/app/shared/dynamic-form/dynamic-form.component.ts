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
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Input() taskDetail: any;
  @Output() formSubmitEvent: EventEmitter<any> = new EventEmitter();
  formDetails = null;
  fields = [];
  dynamicFormGroup: FormGroup;
  buttonState = 'start';
  constructor(private userService: UserService) {}
  ngOnInit() {}
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
    this.getFormData();
  }
  getFormData() {
    forkJoin([
      this.userService.getTasksInput(
        this.taskDetail.containerId,
        this.taskDetail.taskId
      ),
      this.userService.getTasks(),
    ]).subscribe({
      next: (res: any) => {
        if (res && res[1]?.['task-summary']) {
          if (res[1]?.['task-summary'][0]['task-status'] === 'InProgress') {
            this.buttonState = 'complete';
            this.enableForm();
          } else {
            this.buttonState = 'start';
            this.dynamicFormGroup.disable();
          }
        }
        this.dynamicFormGroup.patchValue(res[0]);
      },
    });
  }
  updateTaskState() {
    this.userService.getTasks().subscribe({
      next: (res) => {
        if (res?.['task-summary'][0]['task-status'] === 'InProgress') {
          this.buttonState = 'complete';
          this.enableForm();
        } else {
          this.buttonState = 'start';
          this.dynamicFormGroup.disable();
        }
      },
    });
  }
  enableForm() {
    for (const field of this.fields) {
      if (field.disable === false) {
        this.dynamicFormGroup.get(field.name).enable();
      } else {
        this.dynamicFormGroup.get(field.name).disable();
      }
    }
  }
  onSubmit() {
    this.formSubmitEvent.emit({
      action: 'task',
      state: this.buttonState,
      formObj: this.dynamicFormGroup,
    });
  }
}
