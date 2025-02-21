import {NgModule} from '@angular/core';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {CoreModule} from "../../core/core.module";
import {AuthApiService} from "./services/auth-api.service";


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    CoreModule,
  ],
  providers: [
    AuthApiService
  ]
})
export class AuthModule {
}
