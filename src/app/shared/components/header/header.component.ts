import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../../material.module";
import {FlexModule} from "@angular/flex-layout";
import {CookieService} from "ngx-cookie-service";
import {HeaderService} from "./header.service";
import {CartIconService} from "../../common/service/cart-icon.service";

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

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private cartIconService: CartIconService
  ) {
  }

  ngOnInit(): void {
    this.getCountProducts()
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = this.getCartProductCounter(counter))
  }

  getCountProducts() {
    this.headerService.getCountProducts(Number(this.cookieService.get("cartId")))
      .subscribe(counter => this.cartProductCounter = this.getCartProductCounter(counter))
  }

  private getCartProductCounter(counter: Number) {
    return String(counter.valueOf() > 0 ? counter : "");
  }
}
