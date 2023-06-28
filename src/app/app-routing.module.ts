import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LeaveFormComponent } from './request/leave-form/leave-form.component';
import { TrackRequestComponent } from './request/track-request/track-request.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './interceptor/auth.guard';
import { TaskComponent } from './request/task/task.component';
import { ValidateComponent } from './request/validate/validate.component';
import { ContainersComponent } from './process/containers/containers.component';
import { ProcessFormComponent } from './process/process-form/process-form.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: TaskComponent,
  },
  {
    path: 'applyLeave',
    component: LeaveFormComponent,
  },
  {
    path: 'trackRequest',
    component: TrackRequestComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'validate',
    component: ValidateComponent,
  },
  {
    path: 'processDefination',
    component: ContainersComponent,
  },
  {
    path: 'processForm',
    component: ProcessFormComponent,
  },
  {
    path: '**',
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
