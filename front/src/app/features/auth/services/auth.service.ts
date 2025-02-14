import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {UserSessionInfo} from "../../../core/interfaces/userSessionInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public USER_SESSION_KEY: string = 'userSession';

  public saveUserSession(userSessionInfo : UserSessionInfo): void {
    sessionStorage.setItem(this.USER_SESSION_KEY,JSON.stringify(userSessionInfo));
  }

  public getUserSession(): UserSessionInfo | null {
    const userSession= sessionStorage.getItem(this.USER_SESSION_KEY);

    if(!userSession){
      return null;
    }

    return JSON.parse(userSession);
  }

  public getToken(): string | null
  {
    const userSession= sessionStorage.getItem(this.USER_SESSION_KEY);
    if(!userSession){
      return null;
    }

    const parseUserSession : UserSessionInfo = JSON.parse(userSession);
    return parseUserSession.token;
  }

  public isAuthentication(): boolean {
    const tokenInSession = this.getToken();

    if(tokenInSession == null){
      return false;
    }

    const decoded: JwtPayload  = jwtDecode(tokenInSession, { header: false });
    const expiry = decoded.exp;

    if(expiry == null || expiry == undefined){
      return false;
    }
    const now = new Date();

    return !(now.getTime() > expiry * 1000);
  }
}

