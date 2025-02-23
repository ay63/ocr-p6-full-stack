import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {RegisterRequest} from "../../interface/request/registerRequest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthApiService} from "../../services/auth-api.service";
import {PATTERN_PASSWORD} from "../../../../core/utils/validator-form";
import {
  UnsubscribeObservableService
} from "../../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {getFormErrorMessage} from "../../../../core/utils/errors-message";
import {BreakpointService} from "../../../../core/services/breakpoint/breakpoint.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false
})
export class RegisterComponent implements OnInit {

  isMobile: boolean = false;
  errorsFormMessage = getFormErrorMessage()
  registerForm = new FormGroup({
    profileName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16)
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(64)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(PATTERN_PASSWORD)
    ])
  })

  constructor(
    private authApiService: AuthApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private unsubscribeObservable: UnsubscribeObservableService,
    private breakpointService: BreakpointService,
  ) {
  }

  ngOnInit(): void {
    this.breakpointService.getIsMobile()
      .pipe(this.unsubscribeObservable.takeUntilDestroy)
      .subscribe((isMobile: boolean) => this.isMobile = isMobile);
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerRequest = this.registerForm.value as RegisterRequest;
      this.authApiService.register(registerRequest).pipe(this.unsubscribeObservable.takeUntilDestroy).subscribe({
          next: (_: void) => {
            this.matSnackBar.open("Votre compte a bien été créé !", 'Fermer', {duration: 4000});
            this.router.navigate(['/login'])
          }
        }
      );
    }
  }


}
