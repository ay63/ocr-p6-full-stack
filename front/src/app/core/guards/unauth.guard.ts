import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SessionService} from "../services/session/session.service";

export const UnauthGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const sessionService: SessionService = inject(SessionService);

  if (sessionService.isLogged) {
    router.navigate(['']);
    return false;
  }
  return true;
};
