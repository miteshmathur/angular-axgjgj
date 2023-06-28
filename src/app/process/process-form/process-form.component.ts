import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss'],
})
export class ProcessFormComponent implements OnInit {
  formDetail = {};
  processDetail: { containerId: any; processId: any };
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getQueryParams();
  }
  getQueryParams() {
    this.route.queryParams.subscribe((res: any) => {
      this.processDetail = {
        containerId: res.containerId,
        processId: res.processId,
      };
      this.getFormDetail();
    });
  }
  getFormDetail() {
    this.userService
      .getProcessFormData(
        this.processDetail.containerId,
        this.processDetail.processId
      )
      .subscribe({
        next: (res) => {
          this.formDetail = res;
        },
      });
  }
  submitForm(data: any) {
    const leaveRequest = {
      ...data.formObj.getRawValue(),
    };
    this.userService.startProcessInstance(leaveRequest,this.processDetail.containerId,
      this.processDetail.processId).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {},
    });
  }
}
