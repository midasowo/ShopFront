import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdminConfirmDialogComponent} from "./admin-confirm-dialog/admin-confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AdminConfirmDialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmDialog(): MatDialogRef<AdminConfirmDialogComponent, boolean> {
    return this.dialog.open(AdminConfirmDialogComponent, {
      width: '400px'
    })
  }
}
