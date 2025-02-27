import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {TopicApiService} from "../../../topic/services/topic-api.service";
import {ArticleApiService} from "../../services/article-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ArticleRequest} from "../../interfaces/article-request";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {getFormErrorMessage} from "../../../../core/utils/errors-message";
import {Topic} from "../../../topic/interfaces/topic";

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrl: './form-article.component.scss',
  standalone: false
})
export class FormArticleComponent implements OnInit {

  errorsFormMessage = getFormErrorMessage()
  topic$!: Observable<Topic[]>;
  articleForm = new FormGroup({
    topic: new FormControl('', [Validators.required, Validators.minLength(3)]),
    title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(64)]),
    content: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(2000)]),
  })

  constructor(
    private topicApi: TopicApiService,
    private articleApi: ArticleApiService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private unsubscribeObservable: UnsubscribeObservableService
  ) {
  }

  ngOnInit(): void {
    this.topic$ = this.topicApi.getAll();
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const articleRequest = this.articleForm.value as unknown as ArticleRequest;
      this.articleApi.post(articleRequest).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe({
        next: (_: void) => {
          this.matSnackBar.open("Article créé !", 'Fermer', {duration: 4000});
          this.router.navigate(['/feed'])
        },
        error: (_: void) => {
          this.matSnackBar.open("Erreur, veuillez essayer plus tard !", 'Fermer', {duration: 4000});
        }
      })
    }
  }


}
