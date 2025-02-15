import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Subject} from "../interfaces/subject";
import {BaseItem} from "../../../core/interfaces/baseItem";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SubjectApiService {
  private pathService = '/api/subject';

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<BaseItem[]> {
    return this.httpClient.get<BaseItem[]>(this.pathService)
  }

  public getUnsubscribeSubject() :Observable<BaseItem[]> {
    return this.httpClient.get<BaseItem[]>(`${this.pathService}/unsubscribe`)
  }

}
