import {NgModule} from '@angular/core';
import {FormArticleComponent} from "./components/form-article/form-article.component";
import {ArticleRoutingModule} from "./article-routing.module";
import {CoreModule} from "../../core/core.module";
import {DetailArticleComponent} from "./components/detail-article/detail-article.component";
import {ListArticleComponent} from "./components/list-article/list-article.component";
import {ArticleApiService} from "./services/article-api.service";

@NgModule({
  declarations: [
    FormArticleComponent,
    DetailArticleComponent,
    ListArticleComponent
  ],
  imports: [
    ArticleRoutingModule,
    CoreModule,
  ],
  providers: [
    ArticleApiService
  ]
})
export class ArticleModule {
}
