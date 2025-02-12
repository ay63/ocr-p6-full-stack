import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AuthModule} from "./features/auth/auth.module";
import {FeedModule} from "./features/feed/feed.module";
import {FeedRoutingModule} from "./features/feed/feed-routing.module";

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
    FeedRoutingModule,
    BrowserAnimationsModule,
      ...materialModule
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
