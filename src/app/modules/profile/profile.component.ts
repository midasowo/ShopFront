import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ProfileService} from "./profile.service";
import {OrderListDto} from "./model/order-list-dto";
import {JwtService} from "../../shared/common/service/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  orders!: OrderListDto[]
  displayedColumns = ["id", "placeDate", "orderStatus", "grossValue"]

  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (!this.jwtService.isLoggedIn()) {
      this.router.navigate(["/login"])
    }
    this.getOrders();
  }

  private getOrders() {
    this.profileService.getOrders()
      .subscribe(orders => this.orders = orders)
  }
}
