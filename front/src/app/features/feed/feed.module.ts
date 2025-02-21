import { NgModule } from '@angular/core';
import {FeedRoutingModule} from "./feed-routing.module";
import {FeedComponent} from "./components/feed/feed.component";
import {CoreModule} from "../../core/core.module";
import {FeedApiService} from "./services/feed-api.service";

@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    FeedRoutingModule,
    CoreModule,
  ],
  providers: [
    FeedApiService
  ]
})
export class FeedModule { }
