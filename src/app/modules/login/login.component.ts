import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {JwtService} from "../../shared/common/service/jwt.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private readonly REDIRECT_ROUTE = "/profile"
  loginForm!: FormGroup
  loginError = false
  registerError = false
  registerForm!: FormGroup;
  registerErrorMessage = ''

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.jwtService.isLoggedIn()) {
      this.router.navigate([this.REDIRECT_ROUTE])
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next: response => {
            this.jwtService.setToken(response.token)
            this.router.navigate([this.REDIRECT_ROUTE])
            this.loginError = false
          },
          error: () => this.loginError = true
        })
    }
  }

  register() {
    if (this.registerForm.valid && this.isPasswordIdentical(this.registerForm.value)) {
      this.loginService.register(this.registerForm.value)
        .subscribe({
          next: response => {
            this.jwtService.setToken(response.token)
            this.router.navigate([this.REDIRECT_ROUTE])
          },
          error: err => {
            this.registerError = true
            if (err.error.message) {
              this.registerErrorMessage = err.error.message
            } else {
              this.registerErrorMessage = "Something went wrong. Try again later."
            }
          }
        })
    }
  }

  private isPasswordIdentical(register: any): boolean {
    if (register.password === register.repeatPassword) {
      this.registerError = false
      return true
    } else {
      this.registerError = true
      this.registerErrorMessage = "Passwords are not identical."
      return false
    }
  }
}
