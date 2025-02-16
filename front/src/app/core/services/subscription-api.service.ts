import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BaseItem} from "../interfaces/baseItem";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SubscriptionApiService {
  private pathService = '/api/subscription';

  constructor(private httpClient: HttpClient) {
  }

  public postSubscription(subjectId: string, userId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/subject/${subjectId}/user/${userId}`, null)
  }

  public deleteSubscription(subjectId: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/subject/${subjectId}/user/${userId}`)
  }


  public getProfileSubjectSubscription(): Observable<BaseItem[]> {
    return this.httpClient.get<BaseItem[]>(`${this.pathService}/subscribed`)
  }

}
