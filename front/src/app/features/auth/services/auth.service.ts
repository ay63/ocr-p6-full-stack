import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RegisterRequest} from "../interface/request/registerRequest";
import {LoginRequest} from "../interface/request/loginRequest";
import {UserSessionInfo} from "../../../core/interfaces/user-session-Info";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  TOKEN_KEY: string = 'auth_token';

  public saveToken(token: string): void{
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null
  {
    return sessionStorage.getItem(this.TOKEN_KEY);
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

