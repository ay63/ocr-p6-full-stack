import {Component, OnInit} from '@angular/core';
import {FeedApiService} from "../../services/feed-api.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {Article} from "../../../article/interfaces/article";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  standalone: false
})
export class FeedComponent implements OnInit {
  items$!: Observable<Article[]>;
  private sortOrder$ = new BehaviorSubject<'asc' | 'desc'>('desc');

  constructor(
    private feedApi: FeedApiService,
    private unsubscribeObservable: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.feedApi.getFeed().pipe(this.unsubscribeObservable.takeUntilDestroy)
  }

  sortByDate(a: Article, b: Article): number {
    const dateA: number = new Date(a.createdAt).getTime();
    const dateB: number = new Date(b.createdAt).getTime();
    if (dateA === dateB) {
      return 0;
    }
    return this.sortOrder$.value === 'asc' ? dateA - dateB : dateB - dateA;

  }

  sortItems(items: Article[]): Article[] {
    return [...items].sort((a, b) => this.sortByDate(a, b));
  }

  onSort(order: 'asc' | 'desc') {
    this.sortOrder$.next(order);
    this.items$ = this.items$.pipe(
      map(items => this.sortItems(items))
    );
  }

}
