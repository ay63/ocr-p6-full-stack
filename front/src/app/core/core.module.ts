import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe, NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CardComponent} from "./components/card/card.component";
import {HomeComponent} from "./components/home/home.component";
import {ErrorComponent} from "./components/not-found/error.component";
import {GoBackButtonComponent} from "./components/go-back-button/go-back-button.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {UnsubscribeObservableService} from "./services/unsubsribe-observable/unsubscribe-observable.service";
import {SubscriptionApiService} from "./services/subscription-api.service";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatDivider} from "@angular/material/divider";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

const materialModule = [
  MatSidenavContainer,
  MatNavList,
  MatSidenavContent,
  MatSidenav,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatGridList,
  MatGridTile,
  MatIcon,
  MatIconButton,
  MatButton,
  MatToolbar,
  MatCardSubtitle,
  MatLabel,
  MatDivider,
  MatError,
  MatFormField,
  MatMenu,
  MatInput,
  MatSelect,
  MatOption,
  MatMenuTrigger,
  MatMenuItem
];

const pipes = [
  AsyncPipe,
  DatePipe,
  TitleCasePipe,
]

const angularImport = [
  NgClass,
  NgForOf,
  NgIf,
  RouterOutlet,
  RouterLink,
  RouterLinkActive
]


@NgModule({
  declarations: [
    CardComponent,
    GoBackButtonComponent,
    HomeComponent,
    MainLayoutComponent,
    ErrorComponent,
    GoBackButtonComponent,
  ],
  providers: [
    UnsubscribeObservableService,
    SubscriptionApiService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModule,
    ...angularImport,
    ...pipes
  ],
  exports: [
    CardComponent,
    GoBackButtonComponent,
    HomeComponent,
    MainLayoutComponent,
    ErrorComponent,
    GoBackButtonComponent,
    ReactiveFormsModule,
    ...materialModule,
    ...angularImport,
    ...pipes
  ]
})
export class CoreModule {
}
