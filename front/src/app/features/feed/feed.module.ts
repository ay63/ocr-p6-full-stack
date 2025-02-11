import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedRoutingModule} from "./feed-routing.module";
import {ListFeedComponent} from "./components/list-feed/list-feed.component";

@NgModule({
  declarations: [
    ListFeedComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
  ],
})
export class FeedModule { }
