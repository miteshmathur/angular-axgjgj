import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss'],
})
export class LeaveFormComponent implements OnInit {
  leaveForm!: FormGroup;
  user = '';
  userId = null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getQueryParams();
  }
  getQueryParams() {
    this.route.queryParams.subscribe((res: any) => {
   
      
      this.user = res.user;
    
      this.initializeForm();
    });
  }
  initializeForm() {
    this.leaveForm = this.fb.group({
      employee: [{ value: this.user, disabled: true }],

      leaveType: ['', Validators.required],
      numberOfLeave: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }
  onSubmit() {
    // const leaveRequest = {
    //   ...this.leaveForm.getRawValue(),
    // };
    // this.userService.startProcessInstance(leaveRequest).subscribe({
    //   next: (res) => {
    //     this.router.navigateByUrl("/")
    //   },
    //   error: (err) => {
      
    //   },
    // });
  }
}
