import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from "@angular/router";
import {MaterialModule} from "../../material.module";
import {FlexModule} from "@angular/flex-layout";
import {CookieService} from "ngx-cookie-service";
import {HeaderService} from "./header.service";
import {CartIconService} from "../../common/service/cart-icon.service";
import {JwtService} from "../../common/service/jwt.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FlexModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = 'Shop';
  cartProductCounter = "";
  isLoggedIn = false

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private cartIconService: CartIconService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCountProducts()
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = this.getCartProductCounter(counter))
    this.isLoggedIn = this.jwtService.isLoggedIn()
  }

  getCountProducts() {
    this.headerService.getCountProducts(Number(this.cookieService.get("cartId")))
      .subscribe(counter => this.cartProductCounter = this.getCartProductCounter(counter))
  }

  private getCartProductCounter(counter: Number) {
    return String(counter.valueOf() > 0 ? counter : "");
  }

  logout() {
    this.jwtService.removeToken()
    this.isLoggedIn = false
    this.router.navigate(["/"])
  }
}
