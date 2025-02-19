import {Component, Input, OnInit} from '@angular/core';
import {distinctUntilChanged, filter, map, Observable} from "rxjs";
import {ArticleDetail} from "../../interfaces/article-detail";
import {HttpClient} from "@angular/common/http";
import {ArticleApiService} from "../../services/article-api.service";
import {ActivatedRoute} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ArticlePostComment} from "../../interfaces/article-post-comment";
import {ArticleResponseComment} from "../../interfaces/article-response-comment";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {GoBackButtonComponent} from "../../../../core/components/go-back-button/go-back-button.component";
import {getFormErrorMessage} from "../../../../core/utils/errors-message";

@Component({
  selector: 'app-detail-profile-article',
  imports: [
    MatCardContent,
    MatCard,
    AsyncPipe,
    DatePipe,
    MatDivider,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    GoBackButtonComponent,
    MatInput,
    TitleCasePipe,
    MatError,
    NgIf,
    MatFormField
  ],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.scss'
})
export class DetailArticleComponent implements OnInit {


  errorsFormMessage = getFormErrorMessage()
  @Input()
  detail!: ArticleDetail;
  articleId!: string;

  @Input() comments$!: Observable<ArticleResponseComment[]>;

  commentForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(256)
    ])
  })

  constructor(private httpClient: HttpClient,
              private articleApiService: ArticleApiService,
              private route: ActivatedRoute,
              private unsubscribeObservable: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      distinctUntilChanged()
    ).subscribe(id => {
      this.articleId = id!;
      this.articleApiService.getArticleById(this.articleId).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe((detail: ArticleDetail) => {
        this.detail = detail;
      });
      this.comments$ = this.articleApiService.getCommentsByArticleId(this.articleId).pipe(this.unsubscribeObservable.takeUntilDestroy);
    });
  }

  onSubmitComment() {
    if (this.commentForm.valid) {
      const comment: ArticlePostComment = this.commentForm.value as ArticlePostComment;
      comment.articleId = this.articleId;
      this.articleApiService.postArticleComment(comment).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe({
        next: result => {
          this.comments$ = this.articleApiService.getCommentsByArticleId(this.articleId)
          this.commentForm.reset();
        }
      })
    }
  }


}
