import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTable, MatTableModule} from "@angular/material/table";
import {RouterLink} from "@angular/router";
import {AdminCategoryNameDto} from "../common/dto/admin-category-name-dto";
import {AdminCategoryService} from "./admin-category.service";
import {AdminConfirmDialogService} from "../admin-confirm-dialog.service";

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, RouterLink],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.scss'
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>
  displayedColumns: string[] = ["id", "name", "actions"]
  data: AdminCategoryNameDto[] = []
  isLoadingResults = true;
  confirmMessage = 'Are you sure you want to delete this category?'

  constructor(
    private adminCategoryService: AdminCategoryService,
    private dialogService: AdminConfirmDialogService
  ) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.adminCategoryService.getCategories()
      .subscribe(categories => this.data = categories)
    this.isLoadingResults = false;
  }

  confirmDelete(element: AdminCategoryNameDto) {
    this.dialogService.openConfirmDialog(this.confirmMessage)
      .afterClosed()
      .subscribe(result => {
        if (result)
          this.adminCategoryService.delete(element.id)
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
