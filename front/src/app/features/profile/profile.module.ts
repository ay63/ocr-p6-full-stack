import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {DetailProfileComponent} from "./components/detail-profile/detail-profile.component";
import {MatButton} from "@angular/material/button";
import {ProfileRoutingModule} from "./profile-routing.module";
import {MatDivider} from "@angular/material/divider";
import {CardComponent} from "../../shared/components/card/card.component";

@NgModule({
  declarations: [
    DetailProfileComponent,
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    MatCard,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatDivider,
    MatError,
    CardComponent
  ]
})
export class ProfileModule {
}
