import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageDto} from "./model/home-page-dto";
import {SharedModule} from "../../shared/shared.module";
import {RouterLink} from "@angular/router";
import {HomeService} from "./home.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  homePageData!: HomePageDto

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.getHomePageData()
  }


  private getHomePageData() {
    this.homeService.getHomePageData()
      .subscribe(data => this.homePageData = data)
  }
}
