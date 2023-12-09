import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-confirm-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-confirm-dialog.component.html',
  styleUrl: './admin-confirm-dialog.component.scss'
})
export class AdminConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
