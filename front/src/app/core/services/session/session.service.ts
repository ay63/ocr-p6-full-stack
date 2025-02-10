import { Injectable } from '@angular/core';
import {UserSessionInfo} from "../../interfaces/user-session-Info";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public userSessionInfo: UserSessionInfo | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: UserSessionInfo): void {
    this.userSessionInfo = user;
    this.isLogged = true;
    this.next();
  }

  public logOut(): void {
    this.userSessionInfo = undefined;
    this.isLogged = false;
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
