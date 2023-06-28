import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
})
export class ValidateComponent {
  @ViewChild('dynamicForm') DynamicFormComponent:DynamicFormComponent;
  taskDetail: any = {};

  formDetail = {};
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.getQueryParams();
    this.getFormData();
  }
  getQueryParams() {
    this.route.queryParams.subscribe((res: any) => {
      this.taskDetail = {
        taskId: res.taskId,
        containerId: res.containerId,
        processId: res.processId,
      };
    });
  }
  getFormData() {
    this.userService
      .getFormData(this.taskDetail.containerId, this.taskDetail.taskId)
      .subscribe({
        next: (res) => {
          this.formDetail = res;
        },
      });
  }
  submitForm(data) {
    if (data.state === 'start') {
      this.userService
        .startTask(this.taskDetail.containerId, this.taskDetail.taskId)
        .subscribe({
          next: (res) => {
            this.DynamicFormComponent.updateTaskState()
          },
        });
   
    } else {
      const reqData = data.formObj.value;
      this.userService
        .completeTask(
          this.taskDetail.containerId,
          this.taskDetail.taskId,
          reqData
        )
        .subscribe({
          next: (res) => {
            this.router.navigateByUrl('/');
          },
        });
    }
  }
}
