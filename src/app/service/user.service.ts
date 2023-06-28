import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;
  private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient,private authService:AuthenticationService) {}

  getUser() {
    return this.http.get(this.url);
  }
  addLeaveRequest(reqBody: any) {
    return this.http.post('http://localhost:3000/leaveRequest', reqBody);
  }
  getUserLeaveRequest(userId: string) {
    return this.http.get(
      `http://localhost:3000/leaveRequest/?userId=${userId}`
    );
  }
  getTaskWithStatus(status) {
    const user=this.authService.getUserDetail()
    return this.http.get(
      `${this.baseUrl}/queries/tasks/instances/pot-owners?user=${user}&status=${status}&page=0&pageSize=10&sortOrder=true`
    );
  }
  getTasks(): any {
    const user=this.authService.getUserDetail()
    return this.http.get(
      `${this.baseUrl}/queries/tasks/instances/pot-owners?user=${user}&page=0&pageSize=10&sortOrder=true`
    );
  }
  getTasksInput(containerId: string, taskId: string) {
    return this.http.get(
      `${this.baseUrl}/containers/${containerId}/tasks/${taskId}/contents/input`
    );
  }
  startTask(containerId: string, taskId: string) {
    return this.http.put(
      `${this.baseUrl}/containers/${containerId}/tasks/${taskId}/states/started`,
      {}
    );
  }
  completeTask(containerId: string, taskId: string, data) {
    return this.http.put(
      `${this.baseUrl}/containers/${containerId}/tasks/${taskId}/states/completed`,
      data
    );
  }
  getFormData(containerId: string, taskId: string) {
    return this.http.get(
      `${this.baseUrl}/containers/${containerId}/forms/tasks/${taskId}?lang=en&filter=true&type=ANY&marshallContent=false`
    );
  }
  getProcessFormData(containerId: string, processId: String) {
    return this.http.get(
      `${this.baseUrl}/containers/${containerId}/forms/processes/${processId}`
    );
  }
  getProcessDefiation() {
    return this.http.get(`${this.baseUrl}/containers`);
  }
  getProcessFromContainerId(containerId: string) {
    return this.http.get(`${this.baseUrl}/containers/${containerId}/processes`);
  }
  startProcessInstance(reqBody: any,containerId:string,processId:string) {
    return this.http.post(
      `${this.baseUrl}/containers/${containerId}/processes/${processId}/instances`,
      reqBody
    );
  }
}
