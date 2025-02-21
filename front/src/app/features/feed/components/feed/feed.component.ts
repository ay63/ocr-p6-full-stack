import {Component, OnInit} from '@angular/core';
import {FeedApiService} from "../../services/feed-api.service";
import {Observable} from "rxjs";
import {BaseCartItem} from "../../../../core/models/interfaces/baseCartItem";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  standalone: false
})
export class FeedComponent implements OnInit {
  items$!: Observable<BaseCartItem[]>;

  constructor(
    private feedApi: FeedApiService,
    private unsubscribeObservable: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.feedApi.getFeed().pipe(this.unsubscribeObservable.takeUntilDestroy)
  }

}
