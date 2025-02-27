import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeedComponent} from "./components/feed/feed.component";

const routes: Routes = [
  { title: 'Feed', path: '', component: FeedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
