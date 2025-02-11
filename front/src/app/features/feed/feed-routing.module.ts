import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListFeedComponent} from "./components/list-feed/list-feed.component";

const routes: Routes = [
  { title: 'Feed', path: '', component: ListFeedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
