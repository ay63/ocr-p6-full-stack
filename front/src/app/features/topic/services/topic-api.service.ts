import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Topic} from "../interfaces/topic";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TopicApiService {
  private pathService = '/api/topic';

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.pathService)
  }
}
