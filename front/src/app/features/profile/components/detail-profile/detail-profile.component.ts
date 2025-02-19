import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {BaseItem} from "../../../../core/models/interfaces/baseItem";
import {ProfileApiService} from "../../services/profile-api.service";
import {SubscriptionApiService} from "../../../../core/services/subscription-api.service";
import {AuthDataUser} from "../../../../core/models/interfaces/authDataUser";
import {AuthService} from "../../../auth/services/auth.service";
import {ProfileUpdate} from "../../interface/profile-update";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PATTERN_PASSWORD} from "../../../../core/utils/validator-form";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {getFormErrorMessage} from "../../../../core/utils/errors-message";

@Component({
  selector: 'app-detail-profile-article',
  templateUrl: './detail-profile.component.html',
  styleUrl: './detail-profile.component.scss',
  standalone: false
})
export class DetailProfileComponent implements OnInit {

  errorsFormMessage = getFormErrorMessage()
  items$!: Observable<BaseItem[]>;

  profileForm = new FormGroup({
    profileName: new FormControl('', [Validators.minLength(3)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.pattern(PATTERN_PASSWORD)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileApiService: ProfileApiService,
    private subscriptionApiService: SubscriptionApiService,
    private matSnackBar: MatSnackBar,
    private unsubscribeObservable: UnsubscribeObservableService,
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.subscriptionApiService.getProfileTopicSubscription().pipe(this.unsubscribeObservable.takeUntilDestroy)
    const userSessionInfo = this.authService.getAuthUser();
    if (userSessionInfo != null) {
      this.profileForm.patchValue({
        profileName: userSessionInfo.profileName,
        email: userSessionInfo.email,
      });
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const profile: ProfileUpdate = this.profileForm.value as ProfileUpdate;
      this.profileApiService.putProfile(profile).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe({
        next: (response: AuthDataUser) => {
          this.authService.saveAuthUser(response)
          this.matSnackBar.open("Profile mis à jour !", 'Fermer', {duration: 4000});
        }
      });
    }
  }

  onUnsubscribe(topicId: string): void {
    const userSessionInfo: AuthDataUser | null = this.authService.getAuthUser()
    const userId = userSessionInfo?.id
    this.subscriptionApiService.deleteSubscription(topicId, String(userId)).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe({
      next: () => {
        this.items$ = this.subscriptionApiService.getProfileTopicSubscription().pipe(this.unsubscribeObservable.takeUntilDestroy)
      }
    })
  }

  onLogout(): void {
    this.authService.clearAuthData()
    this.router.navigate(['/']);
  }

  formHasNotInputValue(): boolean {
    return !Object.values(this.profileForm.value).some(value => value?.trim() !== '');
  }
}

