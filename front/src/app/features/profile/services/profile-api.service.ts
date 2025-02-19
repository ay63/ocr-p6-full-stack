import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BaseItem} from "../../../core/models/interfaces/baseItem";
import {ProfileUpdate} from "../interface/profile-update";
import {AuthDataUser} from "../../../core/models/interfaces/authDataUser";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProfileApiService {
  private pathService = '/api/user';

  constructor(private httpClient: HttpClient) {
  }

  public putProfile(profileUpdate: ProfileUpdate): Observable<AuthDataUser> {
    return this.httpClient.put<AuthDataUser>(`${this.pathService}/update`, profileUpdate)
  }
}
