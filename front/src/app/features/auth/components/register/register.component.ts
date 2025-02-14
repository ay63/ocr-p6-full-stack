import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {RegisterRequest} from "../../interface/request/registerRequest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthApiService} from "../../services/auth-api.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false
})
export class RegisterComponent {

  public onError: boolean = false;
  registerForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16)
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(8),
      Validators.maxLength(64)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64)
      //@todo add pattern for password
    ])
  })

  constructor(
    private authApiService: AuthApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar) {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerRequest = this.registerForm.value as RegisterRequest;
      this.authApiService.register(registerRequest).subscribe({
          next: (_: void) => {
            this.matSnackBar.open("Your account has been created !", 'Close', {duration: 4000});
            this.router.navigate(['/login'])
          },
          error: _ => this.onError = true,
        }
      );
    }
  }

}
