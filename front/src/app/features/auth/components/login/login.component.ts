import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AuthDataUser} from "../../../../core/interfaces/authDataUser";
import {Router} from "@angular/router";
import {LoginRequest} from "../../interface/request/loginRequest";
import {AuthApiService} from "../../services/auth-api.service";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private router: Router,
    private unsubscribeObservable: UnsubscribeObservableService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value as LoginRequest;
      this.authApiService.login(loginRequest).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe({
        next: (response: AuthDataUser) => {
          this.authService.saveAuthUser(response)
          this.router.navigate(['/feed'])
        }
      });
    }
  }
}
