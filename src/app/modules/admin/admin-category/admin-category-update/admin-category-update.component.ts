import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminCategoryFormComponent} from "../admin-category-form/admin-category-form.component";
import {FlexModule} from "@angular/flex-layout";
import {SharedModule} from "../../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminCategoryService} from "../admin-category.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../../admin-message.service";
import {AdminCategory} from "../model/admin-category";

@Component({
  selector: 'app-admin-category-update',
  standalone: true,
  imports: [CommonModule, AdminCategoryFormComponent, FlexModule, SharedModule],
  templateUrl: './admin-category-update.component.html',
  styleUrl: './admin-category-update.component.scss'
})
export class AdminCategoryUpdateComponent implements OnInit {

  categoryForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private adminCategoryService: AdminCategoryService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService,
  ) {
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
      slug: ["", [Validators.required, Validators.minLength(3)]]
    })
    this.getCategory()
  }

  submit() {
    this.adminCategoryService.saveCategory(Number(this.router.snapshot.params['id']), this.categoryForm.value)
      .subscribe({
        next: category => {
          this.mapToFormValues(category)
          this.snackBar.open("Category saved", 'OK', {duration: 2000})
        },
        error: err => this.adminMessageService.addBackendErrors(err.error)
      })
  }

  private getCategory() {
    this.adminCategoryService.getCategory(Number(this.router.snapshot.params['id']))
      .subscribe(category => this.mapToFormValues(category))
  }

  private mapToFormValues(category: AdminCategory) {
    this.categoryForm.setValue({
      name: category.name,
      description: category.description,
      slug: category.slug
    })
  }
}
