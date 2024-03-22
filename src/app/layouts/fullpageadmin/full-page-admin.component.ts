import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AdminMessageComponent} from "../../modules/admin/common/component/admin-message/admin-message.component";
import {JwtService} from "../../shared/common/service/jwt.service";

@Component({
  selector: 'app-full-page-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, RouterLink, AdminMessageComponent],
  templateUrl: './full-page-admin.component.html',
  styleUrl: './full-page-admin.component.scss'
})
export class FullPageAdminComponent implements OnInit {

  isLoggedIn = false

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.jwtService.isLoggedIn()
  }

  logout() {
    this.jwtService.removeToken()
    this.isLoggedIn = false
    this.router.navigate(["/"])
  }

}
