import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Subject} from "../interfaces/subject";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SubjectApiService {
  private pathService = '/api/subject';

  constructor(private httpClient: HttpClient) {
  }

  public get(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.pathService)
  }
}
