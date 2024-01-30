import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {map, startWith, switchMap} from "rxjs";
import {SharedModule} from "../../../shared/shared.module";
import {AdminOrder} from "./model/adminOrder";
import {AdminOrderService} from "./admin-order.service";
import {RouterLink} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.scss'
})
export class AdminOrderComponent implements AfterViewInit {

  displayedColumns: string[] = ["id", "placeDate", "orderStatus", "grossValue", "actions"];
  totalElements: number = 0;
  data: Array<AdminOrder> = [];
  statuses!: Map<string, string>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminOrderService: AdminOrderService) {
  }

  ngAfterViewInit(): void {
    this.getInitData()
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminOrderService.getOrders(this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
        if (data === null) {
          return [];
        }
        this.totalElements = data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.data = data);
  }

  getInitData() {
    this.adminOrderService.getInitData()
      .subscribe(data => this.statuses = new Map(Object.entries(data.orderStatuses)))
  }

  resolveStatus(status: string) {
    return this.statuses?.get(status)
  }
}
