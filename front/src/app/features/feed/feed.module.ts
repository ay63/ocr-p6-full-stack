import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedRoutingModule} from "./feed-routing.module";
import {FeedComponent} from "./components/feed/feed.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CardComponent} from "../../shared/components/card/card.component";

@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    CardComponent
  ],
})
export class FeedModule { }
