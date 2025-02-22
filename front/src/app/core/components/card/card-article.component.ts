import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Article} from "../../../features/article/interfaces/article";
import {Observable} from "rxjs";

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrl: './card-article.component.scss',
  standalone: false
})
export class CardArticleComponent implements OnInit {
  cols: number = 2;

  @Input()
  public cardItems$!: Observable<Article[]>;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      this.cols = result.matches ? 1 : 2;
    });
  }

  trackById(index: number, item: Article): number {
    return item.id;
  }
}
