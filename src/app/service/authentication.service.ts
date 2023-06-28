import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router) {}
  checkLogin() {
    const user = localStorage.getItem('token');
    return user ? true : false;
  }
  userLogin(userDetail: any) {
    localStorage.setItem('username', userDetail.username);
    localStorage.setItem(
      'token',
      'Basic ' + btoa(`${userDetail.username}:${userDetail.password}`)
    );
  }
  getUserDetail() {
    return localStorage.getItem('username');
  }
  getToken() {
    const token = localStorage.getItem('token');

    return token;
  }
  logOut() {
    localStorage.clear();
  }
  setTaskState(state: string) {
    sessionStorage.setItem('taskState', state);
  }
  getTaskSate() {
    return sessionStorage.getItem('taskState');
  }
}
