import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../interface/request/registerRequest";
import {Observable} from "rxjs";
import {LoginRequest} from "../interface/request/loginRequest";
import {AuthDataUser} from "../../../core/models/interfaces/authDataUser";
import {Injectable} from "@angular/core";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthApiService{
  private pathService = '/api/auth';

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<AuthDataUser> {
    return this.httpClient.post<AuthDataUser>(`${this.pathService}/login`, loginRequest);
  }
}
