import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Article} from "../../../features/article/interfaces/article";
import {Observable} from "rxjs";
import {BaseCartItem} from "../../models/interfaces/baseCartItem";

import {RouterLink} from "@angular/router";
import {Topic} from "../../../features/topic/interfaces/topic";
import {MatButton} from "@angular/material/button";
import {baseItemType} from "../../types/baseItemType";

@Component({
  selector: 'app-card',
  imports: [
    AsyncPipe,
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink,
    MatButton
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  cols: number = 2;

  @Input()
  public cardItems$!: Observable<BaseCartItem[]>;

  @Input()
  itemType!: baseItemType;

  @Output()
  onBtnAction: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  canUnsubscribe!: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      this.cols = result.matches ? 1 : 2;
    });
  }

  isArticle(item: BaseCartItem): item is Article {
    return this.itemType.type === 'article';
  }

  isTopic(item: BaseCartItem): item is Topic {
    return this.itemType.type === 'topic';
  }

  onButtonClick(itemId: number) {
    this.onBtnAction.emit(String(itemId));
  }

  trackById(index: number, item: BaseCartItem): number {
    return item.id;
  }
}
