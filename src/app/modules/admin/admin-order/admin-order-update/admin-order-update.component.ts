import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminOrderService} from "../admin-order.service";
import {ActivatedRoute} from "@angular/router";
import {AdminOrder} from "../model/adminOrder";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-admin-order-update',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-order-update.component.html',
  styleUrl: './admin-order-update.component.scss'
})
export class AdminOrderUpdateComponent {

  order!: AdminOrder;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrderService: AdminOrderService
  ) {
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
      .subscribe(order => this.order = order);
  }
}
