import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SessionService} from "../services/session/session.service";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}
  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.sessionService.isLogged) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.sessionService.userSessionInfo!.token}`,
        },
      });
    }
    return next.handle(req);
  }
}
