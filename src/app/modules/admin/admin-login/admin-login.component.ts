import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminLoginService} from "./admin-login.service";
import {JwtService} from "../../../shared/common/service/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup
  loginError = false

  constructor(
    private formBuilder: FormBuilder,
    private adminLoginService: AdminLoginService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submit() {
    if (this.loginForm.valid) {
      this.adminLoginService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            this.loginError = false
            if (response.adminAccess) {
              this.jwtService.setToken(response.token)
              this.jwtService.setAdminAccess(true)
            }
            this.router.navigate(["/admin"])
          },
          error: () => this.loginError = true,
        })
    }
  }

}
