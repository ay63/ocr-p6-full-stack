import {Component, OnInit} from '@angular/core';
import {FeedApiService} from "../../services/feed-api.service";
import {Observable} from "rxjs";
import {BaseItem} from "../../../../core/interfaces/baseItem";
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
  items$!: Observable<BaseItem[]>;

  constructor(
    private feedApi: FeedApiService,
    private unsubscribeObservable: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.feedApi.getFeed().pipe(this.unsubscribeObservable.takeUntilDestroy)
  }

}
