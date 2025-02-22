import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {Article} from "../../article/interfaces/article";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class FeedApiService{
  private pathService = '/api/feed';

  constructor(private httpClient: HttpClient) { }

  public getFeed(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.pathService}`);
  }

}
