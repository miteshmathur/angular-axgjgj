import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ProcessDynamicFormComponent } from './process-dynamic-form/process-dynamic-form.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    DynamicFormComponent,
    ProcessDynamicFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxSpinnerModule,
  ],
  exports:[
    DynamicFormComponent,
    MatDialogModule,
    ProcessDynamicFormComponent,
    MatSnackBarModule,
    NgxSpinnerModule,
  ]
})
export class SharedModule { }
