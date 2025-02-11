import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../features/auth/services/auth.service";

export const UnauthGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (authService.isAuthentication()) {
    router.navigate(['feed']);
    return false;
  }
  return true;
};
