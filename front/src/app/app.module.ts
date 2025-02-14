import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './shared/components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AuthModule} from "./features/auth/auth.module";
import {FeedModule} from "./features/feed/feed.module";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import {ArticleModule} from "./features/article/article.module";
import {HeaderComponent} from "./shared/components/header/header.component";
import {Subject} from "rxjs";
import {SubjectModule} from "./features/subject/subject.module";
import {ProfileModule} from "./features/profile/profile.module";

const materialModule = [
  MatButton,
  MatIcon
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FeedModule,
    ArticleModule,
    SubjectModule,
    ProfileModule,
    BrowserAnimationsModule,
    HeaderComponent,
    ...materialModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],

})
export class AppModule {
}
