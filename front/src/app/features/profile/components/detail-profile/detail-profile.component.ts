import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {BaseItem} from "../../../../core/interfaces/baseItem";
import {ProfileApiService} from "../../services/profile-api.service";
import {SubscriptionApiService} from "../../../subscription/services/subscription-api.service";
import {AuthDataUser} from "../../../../core/interfaces/authDataUser";
import {AuthService} from "../../../auth/services/auth.service";
import {ProfileUpdate} from "../../interface/profile-update";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PATTERN_PASSWORD} from "../../../../core/utils/validator-form";

@Component({
  selector: 'app-detail-profile-article',
  templateUrl: './detail-profile.component.html',
  styleUrl: './detail-profile.component.scss',
  standalone: false
})
export class DetailProfileComponent implements OnInit {

  items$!: Observable<BaseItem[]>;
  profileForm = new FormGroup({
    profileName: new FormControl('', [Validators.minLength(3)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(8), Validators.pattern(PATTERN_PASSWORD)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileApiService: ProfileApiService,
    private subscriptionApiService: SubscriptionApiService,
    private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.items$ = this.subscriptionApiService.getProfileSubjectSubscription()
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
      this.profileApiService.putProfile(profile).subscribe({
        next: (response: AuthDataUser) => {
            this.authService.saveAuthUser(response)
            this.matSnackBar.open("Profile updated!", 'Close', {duration: 4000});
        }
      });
    }
  }

  onUnsubscribe(subjectId: string): void {
    const userSessionInfo: AuthDataUser | null = this.authService.getAuthUser()
    const userId = userSessionInfo?.id
    this.subscriptionApiService.deleteSubscription(subjectId, String(userId)).subscribe({
      next: () => {
        this.items$ = this.subscriptionApiService.getProfileSubjectSubscription()
      }
    })
  }

  onLogout(): void {
    sessionStorage.removeItem('userSession')
    this.router.navigate(['/']);
  }
}

