import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {BaseItem} from "../../../../core/interfaces/baseItem";
import {ProfileApiService} from "../../services/profile-api.service";
import {SubscriptionApiService} from "../../../subscription/services/subscription-api.service";
import {UserSessionInfo} from "../../../../core/interfaces/userSessionInfo";
import {AuthService} from "../../../auth/services/auth.service";
import {ProfileUpdate} from "../../interface/profile-update";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-profile-article',
  templateUrl: './detail-profile.component.html',
  styleUrl: './detail-profile.component.scss',
  standalone: false
})
export class DetailProfileComponent implements OnInit {

  items$!: Observable<BaseItem[]>;
  profileForm = new FormGroup({
    profileName: new FormControl('', [Validators.minLength(5)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileApiService: ProfileApiService,
    private subscriptionApiService: SubscriptionApiService,
    private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.items$ = this.profileApiService.getProfileSubjectSubscription()
    const userSessionInfo = this.authService.getUserSession();
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
        next: () => {
          this.matSnackBar.open("Profile updated!", 'Close', {duration: 4000});
        }
      })
    }
  }

  onUnsubscribe(subjectId: string): void {
    const userSessionInfo: UserSessionInfo | null = this.authService.getUserSession()
    if (!userSessionInfo) {
      //@todo send error and redicte
    }
    const userId = userSessionInfo?.id
    if (userId === undefined) {
      return
    }
    this.subscriptionApiService.deleteSubscription(subjectId, String(userId)).subscribe({
      next: () => {
        this.items$ = this.profileApiService.getProfileSubjectSubscription()
      }
    })
  }

  onLogout(): void {
    sessionStorage.removeItem('userSession')
    this.router.navigate(['/']);
  }
}

