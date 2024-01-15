import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../common/model/page";
import {AdminProduct} from "./model/admin-product";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`/api/admin/products?page=${page}&size=${size}`)
  }

  delete(id: number) {
    return this.http.delete<void>('api/admin/products/' + id)
  }
}
