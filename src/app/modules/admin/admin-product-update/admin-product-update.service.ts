import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminProductUpdate} from "./model/admin-product-update";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminProductUpdateService {

  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<AdminProductUpdate> {
    return this.http.get<AdminProductUpdate>('/api/admin/products/' + id)
  }
}
