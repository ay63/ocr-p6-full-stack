import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/components/home/home.component';
import {ErrorComponent} from "./core/components/not-found/error.component";
import {UnauthGuard} from "./core/guards/unauth.guard";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UnauthGuard],
  },
  {
    path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'feed',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/feed/feed.module').then(m => m.FeedModule)
  },
  {
    path: 'article',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'topic',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/topic/topic.module').then(m => m.TopicModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  {path: '404', component: ErrorComponent},
  {path: '500', component: ErrorComponent},
  {path: '400', component: ErrorComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
