import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../../core/components/card/card.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {BehaviorSubject, map, Observable} from "rxjs";
import {BaseCartItem} from "../../../../core/models/interfaces/baseCartItem";
import {ArticleApiService} from "../../services/article-api.service";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Article} from "../../interfaces/article";

@Component({
  selector: 'app-list-article',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    RouterLink,
    CardComponent,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.scss',
})
export class ListArticleComponent implements OnInit {
  items$!: Observable<BaseCartItem[]>;
  private sortOrder$ = new BehaviorSubject<'asc' | 'desc'>('desc');

  constructor(
    private articleApiService: ArticleApiService,
    private unsubscribeObservable: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.articleApiService.getAllArticles().pipe(
      this.unsubscribeObservable.takeUntilDestroy);
  }

  sortByDate(a: BaseCartItem, b: BaseCartItem): number {
    if (this.isArticle(a) && this.isArticle(b)) {
      const dateA: number = new Date(a.createdAt).getTime();
      const dateB: number = new Date(b.createdAt).getTime();
      return this.sortOrder$.value === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  }

  sortItems(items: BaseCartItem[]): BaseCartItem[] {
    return [...items].sort((a, b) => this.sortByDate(a, b));
  }

  onSort(order: 'asc' | 'desc') {
    this.sortOrder$.next(order);
    this.items$ = this.items$.pipe(
      map(items => this.sortItems(items))
    );
  }

  isArticle(item: BaseCartItem): item is Article {
    return (item as Article).createdAt !== undefined;
  }

}
