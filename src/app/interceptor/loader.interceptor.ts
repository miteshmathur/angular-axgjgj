import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinner.show();

    return next.handle(request).pipe(
      catchError((err: any) => {
        console.log(err);
        
        this.snackBar.open(err.error, '', {
          duration: 3000,
        });
        this.spinner.hide();
        return of(err);
      }),
      finalize(() => {
        console.log('hello');

        this.spinner.hide();
      })
    );
  }
}
