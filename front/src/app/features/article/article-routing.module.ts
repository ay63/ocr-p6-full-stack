import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormArticleComponent} from "./components/form-article/form-article.component";
import {DetailArticleComponent} from "./components/detail-article/detail-article.component";

const routes: Routes = [
  {title: 'CreateArticle', path: 'create', component: FormArticleComponent},
  {title: 'DetailArticle', path: 'detail/:id', component: DetailArticleComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
