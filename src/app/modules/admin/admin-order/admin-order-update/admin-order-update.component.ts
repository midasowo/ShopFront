import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminOrderService} from "../admin-order.service";
import {ActivatedRoute} from "@angular/router";
import {AdminOrder} from "../model/adminOrder";
import {SharedModule} from "../../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-order-update',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-order-update.component.html',
  styleUrl: './admin-order-update.component.scss'
})
export class AdminOrderUpdateComponent {

  order!: AdminOrder;
  formGroup!: FormGroup;

  statuses!: Map<string, string>

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrderService: AdminOrderService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getOrder();
    this.getInitData();
    this.formGroup = this.formBuilder.group({
      orderStatus: ['', Validators.required]
    })
  }

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
      .subscribe(order => {
        this.order = order
        this.formGroup.setValue({
          orderStatus: order.orderStatus
        })
      });
  }

  changeStatus() {
    this.adminOrderService.saveStatus(this.order.id, this.formGroup.value)
      .subscribe()
  }

  private getInitData() {
    this.adminOrderService.getInitData()
      .subscribe(data => this.statuses = data.orderStatuses)
  }
}
