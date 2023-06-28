import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-track-request',
  templateUrl: './track-request.component.html',
  styleUrls: ['./track-request.component.scss'],
})
export class TrackRequestComponent implements OnInit {
  userId: any;
  requestDetail: any = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.getQueryParams();
  }
  getQueryParams() {
    this.route.queryParams.subscribe((res: any) => {
      this.userId = res.userId;
      this.getLeaveRequestData();
    });
  }
  getLeaveRequestData() {
    this.userService.getUserLeaveRequest(this.userId).subscribe((res) => {
      this.requestDetail = res;
   
    });
  }
}
