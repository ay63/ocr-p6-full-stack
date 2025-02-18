import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (err.status === 500) {
      errorMessage = 'Erreur interne du serveur. Veuillez réessayer plus tard.';
      this.router.navigate(['500'], {
        queryParams: {
          statusCode: err.status,
          errorMessage: errorMessage
        }
      });
    } else if (err.status === 404) {
      errorMessage = 'Page non trouvée';
      this.router.navigate(['404'],
        {
          queryParams: {
            error: err.message,
            errorMessage: errorMessage
          }
        });
    }
  }
}
