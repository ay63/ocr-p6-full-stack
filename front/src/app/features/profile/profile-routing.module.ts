import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailProfileComponent} from "./components/detail-profile/detail-profile.component";

const routes: Routes = [
  { title: 'Profile', path: '', component: DetailProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
