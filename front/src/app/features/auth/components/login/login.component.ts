import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AuthDataUser} from "../../../../core/models/interfaces/authDataUser";
import {Router} from "@angular/router";
import {LoginRequest} from "../../interface/request/loginRequest";
import {AuthApiService} from "../../services/auth-api.service";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {PATTERN_PASSWORD} from "../../../../core/utils/validator-form";
import {getFormErrorMessage} from "../../../../core/utils/errors-message";
import {BreakpointService} from "../../../../core/services/breakpoint/breakpoint.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent implements OnInit {

  isMobile!: boolean;
  onError: boolean = false
  errorsFormMessage = getFormErrorMessage()
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(PATTERN_PASSWORD)]),
  })


  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private router: Router,
    private unsubscribeObservable: UnsubscribeObservableService,
    private breakpointService: BreakpointService,
  ) {
  }

  ngOnInit(): void {
    this.breakpointService.getIsMobile()
      .pipe(this.unsubscribeObservable.takeUntilDestroy)
      .subscribe((isMobile: boolean) => this.isMobile = isMobile);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value as LoginRequest;
      this.authApiService.login(loginRequest).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe({
        next: (response: AuthDataUser) => {
          this.authService.saveAuthUser(response)
          this.router.navigate(['/feed'])
        },
        error: (_) => this.onError = true
      });
    }
  }
}
