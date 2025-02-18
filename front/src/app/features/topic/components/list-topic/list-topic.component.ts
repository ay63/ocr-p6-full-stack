import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BaseItem} from "../../../../core/models/interfaces/baseItem";
import {TopicApiService, topicApiService} from "../../services/topic-api.service";
import {SubscriptionApiService} from "../../../../core/services/subscription-api.service";
import {AuthService} from "../../../auth/services/auth.service";
import {AuthDataUser} from "../../../../core/models/interfaces/authDataUser";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";

@Component({
  selector: 'app-list-topic',
  templateUrl: './list-topic.component.html',
  styleUrl: './list-topic.component.scss',
  standalone: false
})
export class ListTopicComponent implements OnInit {
  items$!: Observable<BaseItem[]>;

  constructor(
    private authService: AuthService,
    private topicApiService: TopicApiService,
    private subscriptionApiService: SubscriptionApiService,
    private unsubscribeObservable: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.topicApiService.getAll().pipe(this.unsubscribeObservable.takeUntilDestroy)
  }

  onSubscribe(topicId: string): void {
    const userSessionInfo: AuthDataUser | null = this.authService.getAuthUser()
    const userId = userSessionInfo?.id
    if (userId === undefined) {
      return
    }

    this.subscriptionApiService.postSubscription(topicId, String(userId)).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe({
      next: () => this.items$ = this.topicApiService.getAll().pipe(this.unsubscribeObservable.takeUntilDestroy)
    })
  }

}
