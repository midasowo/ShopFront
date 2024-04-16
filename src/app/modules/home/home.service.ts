import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HomePageDto} from "./model/home-page-dto";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  public getHomePageData(): Observable<HomePageDto> {
    return this.http.get<HomePageDto>("/api/homePage");
  }
}
