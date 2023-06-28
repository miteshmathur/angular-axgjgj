import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { ProcessDialogComponent } from './process-dialog/process-dialog.component';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
})
export class ContainersComponent implements OnInit {
  processData = [];
  constructor(private userService: UserService, public dialog: MatDialog) {}
  ngOnInit() {
    this.getProcessDefiantion();
  }
  getProcessDefiantion() {
    this.userService.getProcessDefiation().subscribe({
      next: (res: any) => {
        this.processData = res.result['kie-containers']['kie-container'];
      },
    });
  }
  openDialog(containerId:string) {
    const dialogRef = this.dialog.open(ProcessDialogComponent,{
      data: {
        containerId: containerId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
