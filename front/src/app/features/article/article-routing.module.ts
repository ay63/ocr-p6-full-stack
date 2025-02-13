import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from "./components/form/form.component";
import {DetailComponent} from "./components/detail/detail.component";
import {ListComponent} from "./components/list/list.component";

const routes: Routes = [
  {title : 'AllArticles', path : '', component : ListComponent},
  {title: 'CreateArticle', path: 'create-article', component: FormComponent},
  {title: 'DetailArticle', path: 'detail-article/:id', component: DetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
