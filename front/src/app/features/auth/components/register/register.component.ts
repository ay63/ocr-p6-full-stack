import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {RegisterRequest} from "../../interface/request/registerRequest";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthApiService} from "../../services/auth-api.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false
})
export class RegisterComponent {

  public onError:boolean = false;

  constructor(
    private authApiService: AuthApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar) {}

  registerForm = this.formBuilder.group({
    username: ['',
     [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(16)
     ]
    ],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.minLength(8),
      Validators.maxLength(64)
    ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
        //@todo add pattern for password
      ]
    ]
  });

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerRequest = this.registerForm.value as RegisterRequest;
      this.authApiService.register(registerRequest).subscribe({
          next: (_: void) => {
            this.matSnackBar.open("Your account has been created !", 'Close', { duration: 4000 });
            this.router.navigate(['/login'])
          },
          error: _ => this.onError = true,
        }
      );
    }
  }

}
