import {Component, Input, OnInit} from "@angular/core";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [
    FlexModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  template: `
    <div [formGroup]="parentForm" fxLayout="column">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Enter the product name" formControlName="name">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput rows="20" placeholder="Enter the product description"
                  formControlName="description"></textarea>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Category</mat-label>
        <input matInput placeholder="Enter the product category" formControlName="category">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Price</mat-label>
        <input matInput placeholder="Enter the product price" formControlName="price">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Currency</mat-label>
        <input matInput placeholder="Enter the product currency" formControlName="currency">
      </mat-form-field>

      <div fxLayoutAlign="end">
        <button mat-flat-button color="primary">Save</button>
      </div>

    </div>
  `
})
export class AdminProductFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;

  ngOnInit(): void {
  }

}
