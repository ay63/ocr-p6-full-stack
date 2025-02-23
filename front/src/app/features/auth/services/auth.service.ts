import {Injectable} from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {AuthDataUser} from "../../../core/models/interfaces/authDataUser";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private AUTH_DATA_USER_COOKIE: string = 'authDataUser';
  private ONE_DAY_COOKIE_EXP: number = 1;

  constructor(private cookieService: CookieService) {
    this.checkAuthStatus();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  public saveAuthUser(authDataUser: AuthDataUser): void {
    const jsonData = JSON.stringify(authDataUser);
    this.cookieService.set(this.AUTH_DATA_USER_COOKIE
      , jsonData, {
        expires: this.ONE_DAY_COOKIE_EXP,
        path: '/',
        secure: true,
        sameSite: 'Strict'
      });

    this.checkAuthStatus();
  }

  public getAuthUser(): AuthDataUser | null {
    const authDataUser: AuthDataUser | null = this.getAuthData();

    if (!authDataUser) {
      return null;
    }

    return authDataUser;
  }

  public getToken(): string | null {
    const authDataUser: AuthDataUser | null = this.getAuthData();
    if (!authDataUser) {
      return null;
    }

    return authDataUser.token;
  }

  public getAuthData(): AuthDataUser | null {
    const jsonData = this.cookieService.get(this.AUTH_DATA_USER_COOKIE);
    return jsonData ? JSON.parse(jsonData) : null;
  }

  public clearAuthData() {
    this.cookieService.delete(this.AUTH_DATA_USER_COOKIE, '/');
    this.checkAuthStatus();
  }

  public isAuthentication(): boolean {
    const isTokenValid: boolean = this.checkValidToken();
    this.isLogin.next(isTokenValid);

    return isTokenValid
  }

  private checkValidToken(): boolean {
    const token: string | null = this.getToken();

    if (token == null) {
      return false;
    }

    const decoded: JwtPayload = jwtDecode(token, {header: false});
    const expiry = decoded.exp;

    if (expiry == null || expiry == undefined) {
      return false;
    }
    const now = new Date();


    return !(now.getTime() > expiry * 1000);
  }

  private checkAuthStatus(): void {
    const isTokenValid: boolean = this.checkValidToken();
    this.isLogin.next(isTokenValid);
  }
}

