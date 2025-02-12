import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../features/auth/services/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService : AuthService = inject(AuthService);

  if (!authService.isAuthentication()) {
    router.navigate(['login']);
    return false;
  }

  return true;
};
