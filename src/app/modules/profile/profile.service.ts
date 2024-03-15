import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderListDto} from "./model/order-list-dto";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Array<OrderListDto>> {
    return this.http.get<Array<OrderListDto>>("/api/orders")
  }
}
