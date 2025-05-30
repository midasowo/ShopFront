import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminReview} from "./model/admin-review";

@Injectable({
  providedIn: 'root'
})
export class AdminReviewService {

  constructor(private http: HttpClient) {
  }

  getReviews(): Observable<Array<AdminReview>> {
    return this.http.get<Array<AdminReview>>("/api/admin/reviews");
  }

  moderate(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/reviews/${id}/moderate`, '');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/reviews/${id}`);
  }

}
