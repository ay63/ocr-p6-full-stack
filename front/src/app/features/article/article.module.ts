import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArticleComponent} from "./components/form-article/form-article.component";
import {ArticleRoutingModule} from "./article-routing.module";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {GoBackButtonComponent} from "../../shared/components/go-back-button/go-back-button.component";


const materialModule = [
  MatFormField,
  MatInput,
  MatLabel,
  MatSelect,
  MatOption,
  MatFormField,
  MatButton,
];

@NgModule({
  declarations: [FormArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ...materialModule,
    ReactiveFormsModule,
    MainLayoutComponent,
    MatError,
    GoBackButtonComponent
  ],
})
export class ArticleModule {
}
