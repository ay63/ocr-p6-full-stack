import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Article} from "../../../features/article/interfaces/article";
import {Observable} from "rxjs";
import {BaseItem} from "../../../core/interfaces/baseItem";

import {RouterLink} from "@angular/router";
import {Subject} from "../../../features/subject/interfaces/subject";
import {MatButton} from "@angular/material/button";
import {TruncatePipe} from "../../../core/pipe/truncate.pipe";
import {baseItemType} from "../../../core/types/baseItemType";

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
    MatButton,
    TruncatePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  cols: number = 2;

  @Input()
  public cardItems$!: Observable<BaseItem[]>;

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

  isArticle(item: BaseItem): item is Article {
    return this.itemType.type === 'article';
  }

  isSubject(item: BaseItem): item is Subject {
    return this.itemType.type === 'subject';
  }

  onButtonClick(itemId: number) {
    this.onBtnAction.emit(String(itemId));
  }
}
