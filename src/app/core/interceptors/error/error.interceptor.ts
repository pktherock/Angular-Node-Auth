import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/user/auth.service';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner(); // Show spinner when request starts

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle specific error codes or different types of errors here
        if (error.status === 401) {
          // Unauthorized - redirect to login or perform related actions

          if (!error.url?.includes('validate-session')) {
            this.alertService.error(
              'Session expired, please login again to continue'
            );
            this.authService.setUserOnUnauthorizedAccess();
            this.router.navigate(['/auth/login']);
          }
        } else if (error.status === 404) {
          // Not Found - handle accordingly
        } else {
          this.alertService.error(error.error.title);
          console.error('HTTP Error:', error);
        }

        // Hide the spinner after handling the error
        this.spinnerService.hideSpinner();

        // Return a user-friendly error message
        return throwError(() => new Error(error.error.message));
      }),
      finalize(() => {
        // Hide the spinner when request completes (whether successful or with an error)
        this.spinnerService.hideSpinner();
      })
    );
  }
}
