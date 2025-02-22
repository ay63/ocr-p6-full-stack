import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ProfileApiService} from "../../services/profile-api.service";
import {SubscriptionApiService} from "../../../../core/services/subscription-api.service";
import {AuthDataUser} from "../../../../core/models/interfaces/authDataUser";
import {AuthService} from "../../../auth/services/auth.service";
import {ProfileUpdate} from "../../interface/profile-update";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PATTERN_PASSWORD} from "../../../../core/utils/validator-form";
import {UnsubscribeObservableService} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {getFormErrorMessage} from "../../../../core/utils/errors-message";
import {Topic} from "../../../topic/interfaces/topic";

@Component({
  selector: 'app-detail-profile-article',
  templateUrl: './detail-profile.component.html',
  styleUrl: './detail-profile.component.scss',
  standalone: false
})
export class DetailProfileComponent implements OnInit {

  private itemsSubject: BehaviorSubject<Topic[]> = new BehaviorSubject<Topic[]>([]);
  errorsFormMessage = getFormErrorMessage()
  items$: Observable<Topic[]> = this.itemsSubject.asObservable();

  profileForm = new FormGroup({
    profileName: new FormControl("", [
      Validators.minLength(3),
      Validators.maxLength(16)
    ]),
    email: new FormControl("", [
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(64)
    ]),
    password: new FormControl("", [
      Validators.pattern(PATTERN_PASSWORD)
    ])
  })

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
    this.loadSubscriptions();
    const userSessionInfo: AuthDataUser | null  = this.authService.getAuthUser();
    if (userSessionInfo !== null) {
      this.profileForm.patchValue({
        profileName: userSessionInfo.profileName,
        email: userSessionInfo.email,
      });
    }
  }

  private loadSubscriptions() {
    this.subscriptionApiService.getProfileTopicSubscription()
      .pipe(
        this.unsubscribeObservable.takeUntilDestroy,
        tap(items => this.itemsSubject.next(items))
      )
      .subscribe();
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const profile: ProfileUpdate = this.profileForm.value as ProfileUpdate;
      this.profileApiService.putProfile(profile)
        .pipe(this.unsubscribeObservable.takeUntilDestroy)
        .subscribe({
          next: (response: AuthDataUser) => {
            this.authService.saveAuthUser(response)
            this.matSnackBar.open("Profile mis à jour !", 'Fermer', {duration: 4000});
          }
        });
    }
  }

  onUnsubscribe(topicId: string): void {
    const userSessionInfo: AuthDataUser | null = this.authService.getAuthUser()
    const userId:number | undefined = userSessionInfo?.id;

    const currentItems: Topic[] = this.itemsSubject.value;
    const updatedItems: Topic[] = currentItems.filter(item => item.id !== Number(topicId));
    this.itemsSubject.next(updatedItems);

    this.subscriptionApiService.deleteSubscription(topicId, String(userId))
      .pipe(this.unsubscribeObservable.takeUntilDestroy)
      .subscribe({
        error: () => {
          this.itemsSubject.next(currentItems);
          this.matSnackBar.open("Erreur lors de la désinscription", 'Fermer', {duration: 4000});
        }
      });
  }

  onLogout(): void {
    this.authService.clearAuthData()
    this.router.navigate(['/']);
  }

  formHasNotInputValue(): boolean {
    return !Object.values(this.profileForm.value).some(value => value?.trim() !== '');
  }
}
