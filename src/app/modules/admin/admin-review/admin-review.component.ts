import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {AdminReview} from "./model/admin-review";
import {AdminReviewService} from "./admin-review.service";
import {AdminConfirmDialogService} from "../common/service/admin-confirm-dialog.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-admin-review',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-review.component.html',
  styleUrl: './admin-review.component.scss'
})
export class AdminReviewComponent implements OnInit {
  displayedColumns: string[] = ["authorName", "content", "moderated", "actions"];
  data: AdminReview[] = [];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private adminReviewService: AdminReviewService,
    private dialogService: AdminConfirmDialogService
  ) {
  }

  ngOnInit(): void {
    this.getReviews()
  }

  getReviews() {
    this.adminReviewService.getReviews()
      .subscribe(reviews => this.data = reviews);
  }

  confirmModerate(element: AdminReview) {
    this.dialogService.openConfirmDialog('Do you want to approve this review?')
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminReviewService.moderate(element.id).subscribe(() => {
            this.data.forEach((value) => {
              if (element === value) {
                element.moderated = true;
              }
            });
          });
        }
      });
  }

  confirmDelete(element: AdminReview) {
    this.dialogService.openConfirmDialog('Do you want to delete this review?')
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminReviewService.delete(element.id).subscribe(() => {
            this.data.forEach((value, index) => {
              if (element === value) {
                this.data.splice(index, 1);
                this.table.renderRows();
              }
            });
          });
        }
      });
  }

}
