import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {UnauthGuard} from "./core/guards/unauth.guard";


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
