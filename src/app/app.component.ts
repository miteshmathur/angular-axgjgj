import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'jbpm-app';
  constructor(
    private authenticateService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}
  addLeave() {
    const username: any = this.authenticateService.getUserDetail();
    this.router.navigate(['applyLeave'], {
      queryParams: { user: username },
    });
  }
  logOut() {
    this.authenticateService.logOut();
    window.location.reload();
  }
}
