import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {ActivatedRoute} from "@angular/router";
import {AdminProductUpdateService} from "./admin-product-update.service";
import {AdminProductUpdate} from "./model/admin-product-update";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminProductFormComponent} from "../admin-product-form/admin-product-form.component";

@Component({
  selector: 'app-admin-product-update',
  standalone: true,
  imports: [CommonModule, SharedModule, AdminProductFormComponent],
  templateUrl: './admin-product-update.component.html',
  styleUrl: './admin-product-update.component.scss'
})
export class AdminProductUpdateComponent implements OnInit {

  product!: AdminProductUpdate
  productForm!: FormGroup

  constructor(
    private router: ActivatedRoute,
    private adminProductService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getProduct()
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN'],
    })
  }

  getProduct() {
    let id = this.getProductId()
    this.adminProductService.getProduct(id)
      .subscribe(product => this.mapFormValues(product))
  }

  submit() {
    let id = this.getProductId();
    this.adminProductService.saveProduct(id, this.productForm.value)
      .subscribe(product => {
        this.mapFormValues(product)
        this.snackBar.open("Product updated", 'OK', {duration: 2000})
      })
  }

  private mapFormValues(product: AdminProductUpdate) {
    this.productForm.setValue({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      currency: product.currency
    });
  }

  private getProductId(): number {
    return Number(this.router.snapshot.params['id'])
  }
}
