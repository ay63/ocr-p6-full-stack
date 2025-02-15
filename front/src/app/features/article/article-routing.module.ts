import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormArticleComponent} from "./components/form-article/form-article.component";
import {DetailArticleComponent} from "./components/detail-article/detail-article.component";
import {ListArticleComponent} from "./components/list-article/list-article.component";

const routes: Routes = [
  {title : 'AllArticles', path : '', component : ListArticleComponent},
  {title: 'CreateArticle', path: 'create-article', component: FormArticleComponent},
  {title: 'DetailArticle', path: 'detail-profile-article-article/:id', component: DetailArticleComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
