import {Injectable} from '@angular/core';
import {CartCommonService} from "../common/service/cart-common.service";
import {Observable} from "rxjs";
import {CartSummary} from "../common/model/cart/cart-summary";
import {HttpClient} from "@angular/common/http";
import {OrderSummary} from "./model/order-summary";
import {OrderDto} from "./model/order-dto";
import {InitData} from "./model/init-data";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private cartCommonService: CartCommonService,
    private http: HttpClient
  ) {
  }

  getCart(id: number): Observable<CartSummary> {
    return this.cartCommonService.getCart(id)
  }

  placeOrder(order: OrderDto): Observable<OrderSummary> {
    return this.http.post<OrderSummary>("/api/orders", order)
  }

  getInitData(): Observable<InitData> {
    return this.http.get<InitData>("/api/orders/initData")
  }
}
