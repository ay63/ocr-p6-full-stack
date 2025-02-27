import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
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

  public checkProfileNameExists(profileName: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.pathService}/check-profile-name/${profileName}`);
  }
}
