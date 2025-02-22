import {NgModule} from '@angular/core';
import {ListTopicComponent} from "./components/list-topic/list-topic.component";
import {TopicRoutingModule} from "./topic-routing.module";
import {CoreModule} from "../../core/core.module";
import {TopicApiService} from "./services/topic-api.service";


@NgModule({
  declarations: [
    ListTopicComponent
  ],
  imports: [
    TopicRoutingModule,
    CoreModule,
  ],
  providers: [
    TopicApiService
  ]
})
export class TopicModule {
}
