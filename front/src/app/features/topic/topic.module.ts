import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from "../../core/components/card/card.component";
import {ListTopicComponent} from "./components/list-topic/list-topic.component";
import {TopicRoutingModule} from "./topic-routing.module";



@NgModule({
  declarations: [
    ListTopicComponent
  ],
  exports: [
    ListTopicComponent
  ],
  imports: [
    CommonModule,
    CardComponent,
    TopicRoutingModule
  ]
})
export class TopicModule { }
