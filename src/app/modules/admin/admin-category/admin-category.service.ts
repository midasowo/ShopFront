import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminCategoryNameDto} from "../common/dto/admin-category-name-dto";
import {AdminCategory} from "./model/admin-category";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Array<AdminCategoryNameDto>> {
    return this.http.get<Array<AdminCategoryNameDto>>("/api/admin/categories")
  }

  createCategory(value: any): Observable<AdminCategory> {
    return this.http.post<AdminCategory>("/api/admin/categories", value)
  }

  getCategory(id: number): Observable<AdminCategory> {
    return this.http.get<AdminCategory>("/api/admin/categories/" + id)
  }

  saveCategory(id: number, value: any): Observable<AdminCategory> {
    return this.http.put<AdminCategory>('/api/admin/categories/' + id, value)
  }

  delete(id: number) {
    return this.http.delete<void>('api/admin/categories/' + id)
  }
}
