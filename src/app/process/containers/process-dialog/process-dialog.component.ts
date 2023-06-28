import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-process-dialog',
  templateUrl: './process-dialog.component.html',
  styleUrls: ['./process-dialog.component.scss'],
})
export class ProcessDialogComponent implements OnInit {
  processIds = [];
  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.getProcessIds();
  }
  getProcessIds() {
    this.userService
      .getProcessFromContainerId(this.data.containerId)
      .subscribe({
        next: (res: any) => {
          this.processIds = res.processes;
        },
      });
  }
  createProcess(id: string) {
    this.router.navigateByUrl('/processForm');
    this.router.navigate(['/processForm'], {
      queryParams: {
        containerId: this.data.containerId,
        processId: id,
      },
    });
  }
}
