import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminLoginService} from "./admin-login.service";

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit {

  formGroup!: FormGroup
  loginError = false

  constructor(
    private formBuilder: FormBuilder,
    private adminLoginService: AdminLoginService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submit() {
    if (this.formGroup.valid) {
      this.adminLoginService.login(this.formGroup.value)
        .subscribe({
          next: () => this.loginError = false,
          error: () => this.loginError = true,
        })
    }
  }

}
