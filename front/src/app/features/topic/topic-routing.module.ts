import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListTopicComponent} from "./components/list-topic/list-topic.component";



const routes: Routes = [
  { title: 'Topics', path: '', component: ListTopicComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
