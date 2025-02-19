import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './core/components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AuthModule} from "./features/auth/auth.module";
import {FeedModule} from "./features/feed/feed.module";
import {JwtInterceptor} from "./core/interceptors/jwt/jwt.interceptor";
import {ArticleModule} from "./features/article/article.module";
import {MainLayoutComponent} from "./core/components/main-layout/main-layout.component";
import {TopicModule} from "./features/topic/topic.module";
import {ProfileModule} from "./features/profile/profile.module";
import {ErrorInterceptor} from "./core/interceptors/error/error.interceptor";

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
    TopicModule,
    ProfileModule,
    BrowserAnimationsModule,
    MainLayoutComponent,
    ...materialModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],

})
export class AppModule {
}
