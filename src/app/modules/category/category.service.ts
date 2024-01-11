import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "./model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategoryWithProducts(slug: string): Observable<Category> {
    return this.http.get<Category>(`/api/categories/${slug}/products`)
  }
}
