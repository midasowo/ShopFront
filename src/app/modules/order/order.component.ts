import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {CookieService} from "ngx-cookie-service";
import {OrderService} from "./order.service";
import {CartSummary} from "../common/model/cart/cart-summary";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {OrderDto} from "./model/order-dto";
import {OrderSummary} from "./model/order-summary";
import {InitData} from "./model/init-data";
import {DefaultModule} from "../../layouts/default/default.module";
import {CartIconService} from "../../shared/common/service/cart-icon.service";
import {JwtService} from "../../shared/common/service/jwt.service";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink, DefaultModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  cartSummary!: CartSummary
  formGroup!: FormGroup
  orderSummary!: OrderSummary
  initData!: InitData
  errorMessage = false
  isLoggedIn = false

  private statuses = new Map<string, string>([
    ["NEW", "New"]
  ])

  constructor(
    private cookieService: CookieService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private cartIconService: CartIconService,
    private jwtService: JwtService
  ) {
  }

  ngOnInit(): void {
    this.checkCartEmpty()
    this.formGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      shipment: ['', Validators.required],
      payment: ['', Validators.required],
    })
    this.getInitData()
    this.isLoggedIn = this.jwtService.isLoggedIn()
  }

  checkCartEmpty() {
    let cartId = Number(this.cookieService.get("cartId"))
    this.orderService.getCart(cartId)
      .subscribe(summary => this.cartSummary = summary)
  }

  submit() {
    if (this.formGroup.valid) {
      this.orderService.placeOrder({
        firstname: this.formGroup.get('firstname')?.value,
        lastname: this.formGroup.get('lastname')?.value,
        street: this.formGroup.get('street')?.value,
        zipcode: this.formGroup.get('zipcode')?.value,
        city: this.formGroup.get('city')?.value,
        email: this.formGroup.get('email')?.value,
        phone: this.formGroup.get('phone')?.value,
        cartId: Number(this.cookieService.get("cartId")),
        shipmentId: Number(this.formGroup.get('shipment')?.value.id),
        paymentId: Number(this.formGroup.get('payment')?.value.id)
      } as OrderDto)
        .subscribe({
          next: orderSummary => {
            this.cookieService.delete("cartId")
            this.errorMessage = false
            this.cartIconService.cartChanged(0)
            if (orderSummary.redirectUrl) {
              window.location.href = orderSummary.redirectUrl
            } else {
              this.orderSummary = orderSummary
            }
          },
          error: err => this.errorMessage = true
        })
    }
  }

  getInitData() {
    this.orderService.getInitData()
      .subscribe(initData => {
        this.initData = initData
        this.setDefaultShipment()
        this.setDefaultPayment()
      })
  }

  getShipmentPrice() {
    return this.formGroup.get("shipment")?.value?.price
  }

  getStatus(status: string) {
    return this.statuses.get(status)
  }

  get firstname() {
    return this.formGroup.get("firstname")
  }

  get lastname() {
    return this.formGroup.get("lastname")
  }

  get street() {
    return this.formGroup.get("street")
  }

  get zipcode() {
    return this.formGroup.get("zipcode")
  }

  get city() {
    return this.formGroup.get("city")
  }

  get email() {
    return this.formGroup.get("email")
  }

  get phone() {
    return this.formGroup.get("phone")
  }

  get shipment() {
    return this.formGroup.get("shipment")
  }

  get payment() {
    return this.formGroup.get("payment")
  }

  private setDefaultShipment() {
    const defaultShipment = this.initData.shipments.find(shipment => shipment.defaultShipment);
    if (defaultShipment) {
      this.formGroup.patchValue({
        "shipment": defaultShipment
      });
    }
  }

  private setDefaultPayment() {
    const defaultPayment = this.initData.payments.find(payment => payment.defaultPayment);
    if (defaultPayment) {
      this.formGroup.patchValue({
        "payment": defaultPayment
      });
    }
  }
}
