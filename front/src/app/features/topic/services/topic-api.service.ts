import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BaseItem} from "../../../core/models/interfaces/baseItem";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TopicApiService {
  private pathService = '/api/topic';

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<BaseItem[]> {
    return this.httpClient.get<BaseItem[]>(this.pathService)
  }
}
