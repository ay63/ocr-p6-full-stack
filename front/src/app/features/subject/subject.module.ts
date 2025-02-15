import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from "../../shared/components/card/card.component";
import {ListSubjectComponent} from "./components/list-subject/list-subject.component";
import {SubjectRoutingModule} from "./subject-routing.module";



@NgModule({
  declarations: [
    ListSubjectComponent
  ],
  exports: [
    ListSubjectComponent
  ],
  imports: [
    CommonModule,
    CardComponent,
    SubjectRoutingModule
  ]
})
export class SubjectModule { }
