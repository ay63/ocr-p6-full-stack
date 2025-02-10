import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RegisterRequest} from "../interface/request/registerRequest";
import {LoginRequest} from "../interface/request/loginRequest";
import {UserSessionInfo} from "../../../core/interfaces/user-session-Info";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = '/api/auth';

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<UserSessionInfo> {
    return this.httpClient.post<UserSessionInfo>(`${this.pathService}/login`, loginRequest);
  }
}

