import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BaseItem} from "../../../../core/interfaces/baseItem";
import {SubjectApiService} from "../../services/subject-api.service";
import {SubscriptionApiService} from "../../../subscription/services/subscription-api.service";
import {AuthService} from "../../../auth/services/auth.service";
import {AuthDataUser} from "../../../../core/interfaces/authDataUser";

@Component({
  selector: 'app-list-article-subject',
  templateUrl: './list-subject.component.html',
  styleUrl: './list-subject.component.scss',
  standalone: false
})
export class ListSubjectComponent implements OnInit {

  items$!: Observable<BaseItem[]>;

  constructor(
    private authService: AuthService,
    private subjectApiService: SubjectApiService,
    private subscriptionApiService: SubscriptionApiService) {
  }

  ngOnInit(): void {
    this.items$ = this.subjectApiService.getAll()
  }

  onSubscribe(subjectId: string): void {
    const userSessionInfo: AuthDataUser | null = this.authService.getAuthUser()
    const userId = userSessionInfo?.id
    if (userId === undefined) {
      return
    }

    this.subscriptionApiService.postSubscription(subjectId, String(userId)).subscribe({
      next: () => this.items$ = this.subjectApiService.getAll()
    })
  }

}
