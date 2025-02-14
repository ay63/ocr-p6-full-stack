import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FeedComponent} from "../feed/components/feed/feed.component";
import {ListSubjectComponent} from "./components/list-subject/list-subject.component";



const routes: Routes = [
  { title: 'Subjects', path: '', component: ListSubjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
