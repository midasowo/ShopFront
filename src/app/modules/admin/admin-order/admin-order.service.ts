import {Injectable} from '@angular/core';
import {Page} from "../../common/model/page";
import {HttpClient} from "@angular/common/http";
import {AdminOrder} from "./model/adminOrder";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  constructor(private http: HttpClient) {
  }

  getOrders(pageIndex: number, pageSize: number): Observable<Page<AdminOrder>> {
    return this.http.get<Page<AdminOrder>>(`/api/admin/orders?page=${pageIndex}&size=${pageSize}`);
  }

  getOrder(id: number): Observable<AdminOrder> {
    return this.http.get<AdminOrder>("/api/admin/orders/" + id);
  }
}
