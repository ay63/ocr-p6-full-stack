import {NgModule} from '@angular/core';
import {DetailProfileComponent} from "./components/detail-profile/detail-profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {CoreModule} from "../../core/core.module";
import {FeedApiService} from "../feed/services/feed-api.service";

@NgModule({
  declarations: [
    DetailProfileComponent,
  ],
  imports: [
    ProfileRoutingModule,
    CoreModule,
  ],
  providers: [
    FeedApiService
  ]
})
export class ProfileModule {
}
