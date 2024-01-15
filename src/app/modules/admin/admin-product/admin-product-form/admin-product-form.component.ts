import {Component, Input, OnInit} from "@angular/core";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "../../../../shared/shared.module";
import {AdminCategoryNameDto} from "../../common/dto/admin-category-name-dto";
import {FormCategoryService} from "./form-category.service";

@Component({
  selector: 'app-admin-product-form',
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

      <mat-form-field appearance="fill">
        <mat-label>Full description</mat-label>
        <textarea matInput rows="20" placeholder="Add full description of product"
                  formControlName="fullDescription"></textarea>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Category</mat-label>
        <mat-select formControlName="categoryId">
          <mat-option *ngFor="let el of categories" [value]="el.id">
            {{el.name}}
          </mat-option>
        </mat-select>
        <div *ngIf="categoryId?.invalid && (categoryId?.dirty || categoryId?.touched)" class="error-messages">
          <div *ngIf="categoryId?.errors?.['required']">
            Category is required
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
export class AdminProductFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  categories: Array<AdminCategoryNameDto> = [];

  constructor(private formCategoryService: FormCategoryService) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.formCategoryService.getCategories()
      .subscribe(categories => this.categories = categories)
  }

  get name() {
    return this.parentForm.get("name")
  }

  get description() {
    return this.parentForm.get("description")
  }

  get fullDescription() {
    return this.parentForm.get("fullDescription")
  }

  get categoryId() {
    return this.parentForm.get("categoryId")
  }

  get price() {
    return this.parentForm.get("price")
  }

  get currency() {
    return this.parentForm.get("currency")
  }

  get slug() {
    return this.parentForm.get("slug")
  }

}
