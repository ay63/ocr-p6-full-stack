import {Component, Input, OnInit} from '@angular/core';
import {distinctUntilChanged, filter, map, Observable} from "rxjs";
import {ArticleDetail} from "../../interfaces/article-detail";
import {HttpClient} from "@angular/common/http";
import {ArticleApiService} from "../../services/article-api.service";
import {ActivatedRoute} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ArticlePostComment} from "../../interfaces/article-post-comment";
import {ArticleResponseComment} from "../../interfaces/article-response-comment";

@Component({
  selector: 'app-detail',
  imports: [
    MatCardContent,
    MatCard,
    MatInput,
    AsyncPipe,
    DatePipe,
    MatDivider,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  @Input()
  detail$!: Observable<ArticleDetail>;
  articleId!: string;
  onError: boolean = false;

  @Input() comments$!: Observable<ArticleResponseComment[]>;

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  constructor(private httpClient: HttpClient,
              private articleApiService: ArticleApiService,
              private route: ActivatedRoute
              ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      distinctUntilChanged()
    ).subscribe(id => {
      this.articleId = id!;
      this.detail$ = this.articleApiService.getArticleById(this.articleId);
      this.comments$ = this.articleApiService.getCommentsByArticleId(this.articleId);
    });
  }

  goBack() {
    window.history.back();
  }

  onSubmitComment() {
    if (this.commentForm.valid) {
      const comment: ArticlePostComment = this.commentForm.value as ArticlePostComment;
      comment.articleId = this.articleId;
        this.articleApiService.postArticleComment(comment).subscribe({
          next: result => {
           this.comments$ = this.articleApiService.getCommentsByArticleId(this.articleId)
            this.commentForm.reset();
          },
          error: () => this.onError = true
        })
    }
  }


}
