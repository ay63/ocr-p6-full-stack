import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AuthDataUser} from "../../../../core/interfaces/authDataUser";
import {Router} from "@angular/router";
import {LoginRequest} from "../../interface/request/loginRequest";
import {AuthApiService} from "../../services/auth-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  public onError: boolean = false

  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value as LoginRequest;
      this.authApiService.login(loginRequest).subscribe({
        next: (response: AuthDataUser) => {
          this.authService.saveAuthUser(response)
          this.router.navigate(['/feed'])
        },
        error: _ => this.onError = true,
      });
    }
  }
}
