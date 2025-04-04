import {Component, Input, OnInit} from "@angular/core";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "src/app/shared/shared.module";

@Component({
  selector: 'app-admin-category-form',
  standalone: true,
  imports: [
    FlexModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    SharedModule,
    NgForOf
  ],
  template: `
    <div [formGroup]="parentForm" fxLayout="column">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Enter the product name" formControlName="name">
        <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="error-messages">
          <div *ngIf="name?.errors?.['required']">
            Name is required
          </div>
          <div *ngIf="name?.errors?.['minlength']">
            Name must be at least 3 characters long
          </div>
        </div>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Friendly url</mat-label>
        <input matInput placeholder="Enter url" formControlName="slug">
        <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)" class="error-messages">
          <div *ngIf="slug?.errors?.['required']">
            Slug is required
          </div>
          <div *ngIf="slug?.errors?.['minlength']">
            Slug must be at least 3 characters long
          </div>
        </div>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput rows="10" placeholder="Enter the product description"
                  formControlName="description"></textarea>
        <div *ngIf="description?.invalid && (description?.dirty || description?.touched)" class="error-messages">
          <div *ngIf="description?.errors?.['required']">
            Description is required
          </div>
          <div *ngIf="description?.errors?.['minlength']">
            Description must be at least 3 characters long
          </div>
        </div>
      </mat-form-field>

      <div fxLayoutAlign="end">
        <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Save</button>
      </div>

    </div>
  `,
  styles: [`
    .error-messages {
      color: red;
      font-size: 12px;
    }
  `]
})
export class AdminCategoryFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  get name() {
    return this.parentForm.get("name")
  }

  get description() {
    return this.parentForm.get("description")
  }

  get slug() {
    return this.parentForm.get("slug")
  }

}
