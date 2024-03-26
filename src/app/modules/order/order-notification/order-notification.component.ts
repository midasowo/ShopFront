import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {OrderService} from "../order.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-notification',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './order-notification.component.html',
  styleUrl: './order-notification.component.scss'
})
export class OrderNotificationComponent implements OnInit {

  status = false

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getStatus()
  }

  getStatus() {
    let hash = this.route.snapshot.params['orderHash']
    this.orderService.getStatus(hash)
      .subscribe(status => this.status = status.paid)
  }

}
