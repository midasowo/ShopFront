import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CategoryService} from "./category.service";
import {Category} from "./model/category";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FlexModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  category!: Category

  constructor(
    private categoryService: CategoryService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getCategoryWithProducts()
  }

  getCategoryWithProducts() {
    let slug = this.router.snapshot.params['slug']
    this.categoryService.getCategoryWithProducts(slug)
      .subscribe(category => this.category = category)
  }

  get categoryName() {
    return this.category ? this.category.name : '';
  }

  get categoryDescription() {
    return this.category ? this.category.description : '';
  }


}
