import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SharedModule} from "../../../../shared/shared.module";
import {ActivatedRoute} from "@angular/router";
import {AdminProductUpdate} from "../model/admin-product-update";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminProductFormComponent} from "../admin-product-form/admin-product-form.component";
import {AdminMessageService} from "../../common/service/admin-message.service";
import {AdminProductImageService} from "../admin-product-image.service";
import {AdminProductUpdateService} from "./admin-product-update.service";

@Component({
  selector: 'app-admin-product-update',
  standalone: true,
  imports: [CommonModule, SharedModule, AdminProductFormComponent, NgOptimizedImage],
  templateUrl: './admin-product-update.component.html',
  styleUrl: './admin-product-update.component.scss'
})
export class AdminProductUpdateComponent implements OnInit {

  product!: AdminProductUpdate
  productForm!: FormGroup
  imageForm!: FormGroup
  requiredFileTypes = "image/jpeg, image/png"
  image: string = ''

  constructor(
    private router: ActivatedRoute,
    private adminProductUpdateService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService,
    private adminProductImageService: AdminProductImageService,
  ) {
  }

  ngOnInit(): void {
    this.getProduct()

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      fullDescription: [''],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      salePrice: ['', [Validators.min(0.01)]],
      currency: ['PLN', Validators.required],
      slug: ['', [Validators.required, Validators.minLength(3)]],
    })

    this.imageForm = this.formBuilder.group({
      file: ['']
    })
  }

  getProduct() {
    let id = this.getProductId()
    this.adminProductUpdateService.getProduct(id)
      .subscribe(product => this.mapFormValues(product))
  }

  submit() {
    let id = this.getProductId();
    const formData = this.productForm.getRawValue();
    formData.image = this.image;

    this.adminProductUpdateService.saveProduct(id, formData)
      .subscribe({
        next: product => {
          this.mapFormValues(product)
          this.snackBar.open("Product updated", 'OK', {duration: 2000})
        },
        error: err => this.adminMessageService.addBackendErrors(err.error)
      })
  }

  uploadFile() {
    let formData = new FormData()
    formData.append('file', this.imageForm.get('file')?.value)
    this.adminProductImageService.uploadImage(formData)
      .subscribe(result => this.image = result.filename)
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0)
      this.imageForm.patchValue({
        file: event.target.files[0]
      })
  }

  private mapFormValues(product: AdminProductUpdate) {
    this.productForm.setValue({
      name: product.name,
      description: product.description,
      fullDescription: product.fullDescription,
      categoryId: product.categoryId,
      price: product.price,
      salePrice: product.salePrice,
      currency: product.currency,
      slug: product.slug
    });
    this.image = product.image
  }

  private getProductId(): number {
    return Number(this.router.snapshot.params['id'])
  }
}
