import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../features/article/interfaces/article";
import {Observable} from "rxjs";
import {UnsubscribeObservableService} from "../../services/unsubsribe-observable/unsubscribe-observable.service";
import {BreakpointService} from "../../services/breakpoint/breakpoint.service";

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrl: './card-article.component.scss',
  standalone: false
})
export class CardArticleComponent implements OnInit {
  cols!: Observable<number>;

  @Input()
  public cardItems$!: Observable<Article[]>;

  constructor(
    private breakpointService: BreakpointService,
    private unsubscribeObservableService: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.cardItems$.pipe(this.unsubscribeObservableService.takeUntilDestroy).subscribe(items => {
        this.cols = this.breakpointService.gridBreakPoint(items);
      }
    )
  }

  trackById(index: number, item: Article): number {
    return item.id;
  }
}
