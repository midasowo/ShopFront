import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from "@angular/flex-layout";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import {AdminCategoryFormComponent} from "../admin-category-form/admin-category-form.component";
import {AdminCategoryService} from "../admin-category.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../../common/service/admin-message.service";

@Component({
  selector: 'app-admin-category-add',
  standalone: true,
  imports: [CommonModule, FlexModule, FormsModule, SharedModule, AdminCategoryFormComponent],
  templateUrl: './admin-category-add.component.html',
  styleUrl: './admin-category-add.component.scss'
})
export class AdminCategoryAddComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCategoryService: AdminCategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
      slug: ["", [Validators.required, Validators.minLength(3)]]
    })
  }

  submit() {
    this.adminCategoryService.createCategory(this.categoryForm.value)
      .subscribe({
        next: category => {
          this.router.navigate(["/admin/categories"])
            .then(() => this.snackBar.open("Category saved", 'OK', {duration: 2000}))
        },
        error: err => this.adminMessageService.addBackendErrors(err.error)
      })
  }
}
