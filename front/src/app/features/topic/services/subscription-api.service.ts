import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Topic} from "../interfaces/topic";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SubscriptionApiService {
  private pathService = '/api/subscription';

  constructor(private httpClient: HttpClient) {
  }

  public postSubscription(topicId: string, userId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/topic/${topicId}/user/${userId}`, null)
  }

  public deleteSubscription(topicId: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/topic/${topicId}/user/${userId}`)
  }

  public getProfileTopicSubscription(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.pathService}/subscribed`)
  }

}
