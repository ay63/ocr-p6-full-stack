import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TopicApiService} from "../../services/topic-api.service";
import {SubscriptionApiService} from "../../../../core/services/subscription-api.service";
import {AuthService} from "../../../auth/services/auth.service";
import {AuthDataUser} from "../../../../core/models/interfaces/authDataUser";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {tap} from "rxjs/operators";
import {Topic} from "../../interfaces/topic";

@Component({
  selector: 'app-list-topic',
  templateUrl: './list-topic.component.html',
  styleUrl: './list-topic.component.scss',
  standalone: false
})
export class ListTopicComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<Topic[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(
    private authService: AuthService,
    private topicApiService: TopicApiService,
    private subscriptionApiService: SubscriptionApiService,
    private unsubscribeObservable: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.loadTopics();
  }

  onSubscribe(topicId: string): void {
    const userSessionInfo: AuthDataUser | null = this.authService.getAuthUser()
    const userId = userSessionInfo?.id
    if (userId === undefined) {
      return
    }

    const currentItems: Topic[] = this.itemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.id === Number(topicId) ? {...item, isSubscribed: true} : item
    );
    this.itemsSubject.next(updatedItems);

    this.subscriptionApiService.postSubscription(topicId, String(userId))
      .pipe(this.unsubscribeObservable.takeUntilDestroy)
      .subscribe({
        error: () => {
          this.itemsSubject.next(currentItems);
        }
      });
  }

  private loadTopics(): void {
    this.topicApiService.getAll()
      .pipe(
        this.unsubscribeObservable.takeUntilDestroy,
        tap(items => this.itemsSubject.next(items))
      )
      .subscribe();
  }

}
