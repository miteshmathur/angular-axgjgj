import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  tasksList: any = [];
  validateButtonFlag = false;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.getTask();
  }
  loadTask(event) {
    const taskFilter = event.target.value;
    if (taskFilter !== 'Reserved') {
      this.validateButtonFlag = true;
    } else {
      this.validateButtonFlag = false;
    }
    this.userService.getTaskWithStatus(taskFilter).subscribe({
      next: (res: any) => {
        this.tasksList = res['task-summary'];
      },
    });
  }
  getTask() {
    this.userService.getTasks().subscribe({
      next: (res: any) => {
        this.tasksList = res['task-summary'];
      },
    });
  }

  navigateToValidatePage(task: any) {
    this.router.navigate(['validate'], {
      queryParams: {
        taskId: task['task-id'],
        containerId: task['task-container-id'],
        processId: task['task-proc-def-id'],
      },
    });
  }
}
