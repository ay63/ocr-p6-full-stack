import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {BaseItem} from "../../../core/interfaces/baseItem";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class FeedApiService{
  private pathService = '/api/feed';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public getFeed(): Observable<BaseItem[]> {
    const id: number = parseInt(String(this.authService!.getAuthUser()!.id));
    return this.httpClient.get<BaseItem[]>(`${this.pathService}/${id}`);
  }

}
