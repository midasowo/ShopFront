import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {AdminProductFormComponent} from "../admin-product-form/admin-product-form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminProductAddService} from "./admin-product-add.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../admin-message.service";

@Component({
  selector: 'app-admin-product-add',
  standalone: true,
  imports: [CommonModule, SharedModule, AdminProductFormComponent],
  templateUrl: './admin-product-add.component.html',
  styleUrl: './admin-product-add.component.scss'
})
export class AdminProductAddComponent implements OnInit {

  productForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private adminProductAddService: AdminProductAddService,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      currency: ['PLN', Validators.required],
      slug: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  submit() {
    this.adminProductAddService.saveNewProduct(this.productForm.value)
      .subscribe({
        next: product => {
          this.router.navigate(["/admin/products/update", product.id])
            .then(() => this.snackBar.open("Product saved", 'OK', {duration: 2000}))
        },
        error: err => this.adminMessageService.addBackendErrors(err.error)
      })
  }
}
