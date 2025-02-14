import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BaseItem} from "../../../core/interfaces/baseItem";
import {ProfileUpdate} from "../interface/profile-update";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProfileApiService {
  private pathService = '/api/subscription';

  constructor(private httpClient: HttpClient) {
  }

  public putProfile(profileUpdate: ProfileUpdate): Observable<ProfileUpdate[]> {
    return this.httpClient.put<ProfileUpdate[]>(`${this.pathService}/update`, profileUpdate)
  }

  public getProfileSubjectSubscription(): Observable<BaseItem[]> {
    return this.httpClient.get<BaseItem[]>(`${this.pathService}/subscribed`)
  }

}
