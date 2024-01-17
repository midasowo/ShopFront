import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartSummary} from "../common/model/cart/cart-summary";
import {CartCommonService} from "../common/service/cart-common.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private cartCommonService: CartCommonService
  ) {
  }

  getCart(id: number): Observable<CartSummary> {
    return this.cartCommonService.getCart(id)
  }

  addToCart(id: number, cartItem: any): Observable<CartSummary> {
    return this.http.put<CartSummary>("/api/carts/" + id, cartItem)
  }

  updateCart(id: number, items: any[]) {
    return this.http.put<CartSummary>("/api/carts/" + id + "/update", items)
  }

  deleteCartItem(itemId: number) {
    return this.http.delete("/api/cartItems/" + itemId)
  }
}
