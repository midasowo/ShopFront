import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {AdminProductService} from "./admin-product.service";
import {MatPaginator} from "@angular/material/paginator";
import {startWith, switchMap} from "rxjs";
import {AdminProduct} from "./admin-product";
import {RouterLink} from "@angular/router";
import {AdminConfirmDialogService} from "../admin-confirm-dialog.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss'
})
export class AdminProductComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatTable) table!: MatTable<any>
  displayedColumns: string[] = ["id", "name", "price", "actions"];
  totalElements: number = 0
  data: AdminProduct[] = []
  isLoadingResults = true;
  confirmMessage = 'Are you sure you want to delete this product?'

  constructor(
    private adminProductService: AdminProductService,
    private dialogService: AdminConfirmDialogService
  ) {
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize)
      }),
    ).subscribe(data => {
      this.totalElements = data.totalElements
      this.data = data.content
      this.isLoadingResults = false;
    })
  }

  confirmDelete(element: AdminProduct) {
    this.dialogService.openConfirmDialog(this.confirmMessage)
      .afterClosed()
      .subscribe(result => {
        if (result)
          this.adminProductService.delete(element.id)
            .subscribe(() => {
              this.data.forEach((value, index) => {
                if (element == value) {
                  this.data.splice(index, 1)
                  this.table.renderRows()
                }
              })
            })
      })
  }
}
