import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminOrderService} from "../admin-order.service";

@Component({
  selector: 'app-admin-order-export',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-order-export.component.html',
  styleUrl: './admin-order-export.component.scss'
})
export class AdminOrderExportComponent implements OnInit {

  formGroup!: FormGroup
  statuses = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminOrderService: AdminOrderService,
  ) {
  }

  ngOnInit(): void {
    this.getInitData();
    this.formGroup = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      orderStatus: ['', Validators.required],
    })
  }

  export() {
    if (this.formGroup.valid) {
      this.adminOrderService.exportData(
        this.formGroup.get("from")?.value.toISOString(),
        this.formGroup.get("to")?.value.toISOString(),
        this.formGroup.get("orderStatus")?.value,
      )
        .subscribe(
          response => {
            let a = document.createElement('a')
            let objectUrl = URL.createObjectURL(response.body)
            a.href = objectUrl
            a.download = response.headers.get("Content-Disposition")
            a.click()
            URL.revokeObjectURL(objectUrl)
          }
        )
    }
  }

  private getInitData() {
    this.adminOrderService.getInitData()
      .subscribe(data => this.statuses = data.orderStatuses)
  }
}
