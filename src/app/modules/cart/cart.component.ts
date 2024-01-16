import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CartService} from "./cart.service";
import {CartSummary} from "./model/cart-summary";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  summary!: CartSummary;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.queryParams['productId'])
    if (id > 0) {
      this.addToCart(id)
    } else {
      this.getCart()
    }
  }

  getCart() {
    let cartId = Number(this.cookieService.get("cartId"))
    if (cartId > 0) {
      this.cartService.getCart(cartId)
        .subscribe(summary => this.summary = summary)
    }

  }

  addToCart(id: number) {
    let cartId = Number(this.cookieService.get("cartId"))
    this.cartService.addToCart(cartId, {productId: id, quantity: 1})
      .subscribe(summary => {
        this.summary = summary
        this.cookieService.delete("cartId")
        this.cookieService.set("cartId", summary.id.toString(), this.expiresDays(3))
        this.router.navigate(["/cart"])
      })
  }

  private expiresDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  }
}
