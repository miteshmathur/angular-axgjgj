import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { LeaveFormComponent } from './request/leave-form/leave-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackRequestComponent } from './request/track-request/track-request.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './request/task/task.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidateComponent } from './request/validate/validate.component';
import { SharedModule } from './shared/shared.module';
import { ContainersComponent } from './process/containers/containers.component';
import { ProcessDialogComponent } from './process/containers/process-dialog/process-dialog.component';
import { ProcessFormComponent } from './process/process-form/process-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LeaveFormComponent,
    TrackRequestComponent,
    LoginComponent,
    TaskComponent,
    ValidateComponent,
    ContainersComponent,
    ProcessDialogComponent,
    ProcessFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
