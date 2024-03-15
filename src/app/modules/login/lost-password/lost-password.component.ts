import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lost-password',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './lost-password.component.html',
  styleUrl: './lost-password.component.scss'
})
export class LostPasswordComponent implements OnInit {

  formGroupResetPassword!: FormGroup
  formError = ""
  hash = "";
  formGroupChangePassword!: FormGroup;
  formChangePasswordError = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.formGroupResetPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.hash = this.route.snapshot.params['hash'];
    this.formGroupChangePassword = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  send() {
    if (this.formGroupResetPassword.valid) {
      this.loginService.lostPassword(this.formGroupResetPassword.value)
        .subscribe({
          next: result => {
            this.formError = "";
            this.formGroupResetPassword.reset();
            this.snackBar.open('An email with a link to change your password has been sent.', '', {
              duration: 3000, panelClass: "snack-bar-bg-color-ok"
            });
            this.router.navigate(["/login"])
          },
          error: error => this.formError = error.error.message
        });
    }
  }

  sendChangePassword() {
    if (this.formGroupChangePassword.valid && this.passwordIdentical(this.formGroupChangePassword.value)) {
      this.loginService.changePassword({
        password:
        this.formGroupChangePassword.get("password")?.value,
        repeatPassword:
        this.formGroupChangePassword.get("repeatPassword")?.value,
        hash: this.hash
      }).subscribe({
        next: () => {
          this.formChangePasswordError = ""
          this.formGroupChangePassword.reset()
          this.snackBar.open('Password has been changed', '', {
            duration: 3000, panelClass: "snack-bar-bg-color-ok"
          });
          this.router.navigate(["/login"])
        },
        error: error => this.formChangePasswordError = error.error.message
      });
    }
  }

  private passwordIdentical(changePassword: any) {
    if (changePassword.password === changePassword.repeatPassword) {
      this.formChangePasswordError = "";
      return true;
    }
    this.formChangePasswordError = "Passwords are not identical.";
    return false;
  }

}
