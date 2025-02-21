import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BaseCartItem} from "../../../core/models/interfaces/baseCartItem";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TopicApiService {
  private pathService = '/api/topic';

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<BaseCartItem[]> {
    return this.httpClient.get<BaseCartItem[]>(this.pathService)
  }
}
