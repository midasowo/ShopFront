import {Component, Input} from "@angular/core";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [
    FlexModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
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

      <mat-form-field>
        <mat-label>Category</mat-label>
        <input matInput placeholder="Enter the product category" formControlName="category">
        <div *ngIf="category?.invalid && (category?.dirty || category?.touched)" class="error-messages">
          <div *ngIf="category?.errors?.['required']">
            Category is required
          </div>
          <div *ngIf="category?.errors?.['minlength']">
            Category must be at least 3 characters long
          </div>
        </div>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Price</mat-label>
        <input matInput placeholder="Enter the product price" formControlName="price">
        <div *ngIf="price?.invalid && (price?.dirty || price?.touched)" class="error-messages">
          <div *ngIf="price?.errors?.['required']">
            Price is required
          </div>
          <div *ngIf="price?.errors?.['min']">
            Price must be at least 0.01
          </div>
        </div>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Currency</mat-label>
        <input matInput placeholder="Enter the product currency" formControlName="currency">
        <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)" class="error-messages">
          <div *ngIf="currency?.errors?.['required']">
            Currency is required
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
export class AdminProductFormComponent {

  @Input() parentForm!: FormGroup;

  get name() {
    return this.parentForm.get("name")
  }

  get description() {
    return this.parentForm.get("description")
  }

  get category() {
    return this.parentForm.get("category")
  }

  get price() {
    return this.parentForm.get("price")
  }

  get currency() {
    return this.parentForm.get("currency")
  }

}
