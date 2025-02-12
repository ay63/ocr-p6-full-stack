import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Article} from "../../../core/interfaces/article";
import {Subject} from "../../../core/interfaces/subject";
import {Observable} from "rxjs";
import {BaseItem} from "../../../core/interfaces/baseItem";

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
    TitleCasePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent  implements OnInit {
  cols: number = 2;

  @Input()
  public items!: Observable<BaseItem[]>;

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
    return (item as Article).author !== undefined;
  }

  isSubject(item: BaseItem): item is Subject {
    return (item as Subject).description !== undefined;
  }
}
