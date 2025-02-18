import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedRoutingModule} from "./feed-routing.module";
import {FeedComponent} from "./components/feed/feed.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CardComponent} from "../../core/components/card/card.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

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
    CardComponent,
    MatButton,
    MatIcon,
    MatIconButton
  ],
})
export class FeedModule { }
