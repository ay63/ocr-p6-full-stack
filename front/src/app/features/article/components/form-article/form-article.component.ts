import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {SubjectApiService} from "../../../subject/services/subject-api.service";
import {ArticleApiService} from "../../services/article-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ArticleRequest} from "../../interfaces/article-request";
import {BaseItem} from "../../../../core/interfaces/baseItem";

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrl: './form-article.component.scss',
  standalone: false
})
export class FormArticleComponent implements OnInit {

  subject$!: Observable<BaseItem[]>;
  articleForm = new FormGroup({
    subject: new FormControl('', [Validators.required, Validators.minLength(3)]),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
  })

  constructor(
    private subjectApi: SubjectApiService,
    private articleApi: ArticleApiService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.subject$ = this.subjectApi.getAll();
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const articleRequest = this.articleForm.value as  unknown as ArticleRequest;
      this.articleApi.post(articleRequest).subscribe({
        next: (_: void) => {
          this.matSnackBar.open("Article created !", 'Close', {duration: 4000});
          this.router.navigate(['/feed'])
        },
        error: (_: void) => {
          this.matSnackBar.open("Something goes wrong, please try later !", 'Close', {duration: 4000});
        }
      })
    }
  }

}
