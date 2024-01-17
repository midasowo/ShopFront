import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CartService} from "./cart.service";
import {CartSummary} from "../common/model/cart/cart-summary";
import {CookieService} from "ngx-cookie-service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CartSummaryItem} from "../common/model/cart/cart-summary-item";
import {CartIconService} from "../../shared/common/service/cart-icon.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  summary!: CartSummary
  formGroup!: FormGroup
  private isProductAdded = false

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cartIconService: CartIconService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.queryParams['productId'])
    if (id > 0) {
      this.addToCart(id)
      this.isProductAdded = true;
    } else {
      this.getCart()
      this.isProductAdded = false;
    }
    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
  }

  getCart() {
    let cartId = Number(this.cookieService.get("cartId"))
    if (cartId > 0) {
      this.cartService.getCart(cartId)
        .subscribe(summary => {
          this.summary = summary
          this.patchFormItems()
          this.cartIconService.cartChanged(summary.items.length)
        })
    }

  }

  addToCart(id: number) {
    let cartId = Number(this.cookieService.get("cartId"))
    this.cartService.addToCart(cartId, {productId: id, quantity: 1})
      .subscribe(summary => {
        this.summary = summary
        this.patchFormItems()
        this.cartIconService.cartChanged(summary.items.length)
        this.cookieService.delete("cartId")
        this.cookieService.set("cartId", summary.id.toString(), this.expiresDays(3))
        this.router.navigate(["/cart"])
      })
  }

  submit() {
    let cartId = Number(this.cookieService.get("cartId"))
    this.cartService.updateCart(cartId, this.mapToRequestListDto())
      .subscribe(summary => {
        this.summary = summary
        this.formGroup.get("items")?.setValue(summary.items)
      })
  }

  back() {
    this.location.historyGo(this.isProductAdded ? -2 : -1);
  }

  patchFormItems() {
    let formItems = <FormArray>this.formGroup.get("items")
    this.summary.items.forEach(item => {
      formItems.push(this.formBuilder.group({
        id: [item.id],
        quantity: [item.quantity],
        product: [item.product],
        lineValue: [item.lineValue]
      }))
    })
  }

  deleteItem(itemId: number) {
    this.cartService.deleteCartItem(itemId)
      .subscribe(() => this.ngOnInit())
  }

  get items() {
    return (<FormArray>this.formGroup.get("items")).controls
  }

  private expiresDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  }

  private mapToRequestListDto(): any[] {
    let items: Array<CartSummaryItem> = this.formGroup.get("items")?.value
    return items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }))
  }
}
