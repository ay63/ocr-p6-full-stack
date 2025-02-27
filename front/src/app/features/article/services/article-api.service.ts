import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ArticleRequest} from "../interfaces/article-request";
import {ArticleDetail} from "../interfaces/article-detail";
import {ArticlePostComment} from "../interfaces/article-post-comment";
import {ArticleResponseComment} from "../interfaces/article-response-comment";
import {Article} from "../interfaces/article";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticleApiService {
  private pathService = '/api/article';

  constructor(private httpClient: HttpClient) {
  }

  public post(articleRequest: ArticleRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/create`, articleRequest);
  }

  public getArticleById(id: string): Observable<ArticleDetail> {
    return this.httpClient.get<ArticleDetail>(`${this.pathService}/${id}`);
  }

  public postArticleComment(comment: ArticlePostComment) {
    return this.httpClient.post<ArticlePostComment>(`${this.pathService}/comment`, comment);
  }

  public getCommentsByArticleId(id: string): Observable<ArticleResponseComment[]> {
    return this.httpClient.get<ArticleResponseComment[]>(`${this.pathService}/comment/${id}`);
  }

  public getAllArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.pathService}`);
  }
}
