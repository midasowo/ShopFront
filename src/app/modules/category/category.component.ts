import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {CategoryService} from "./category.service";
import {filter, Subscription} from "rxjs";
import {CategoryProducts} from "./model/category-products";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FlexModule, MatButtonModule, MatCardModule, RouterLink, MatPaginatorModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryProducts!: CategoryProducts
  private subscription!: Subscription

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getCategoryWithProducts(0, 10))
    this.getCategoryWithProducts(0, 10)
  }

  getCategoryWithProducts(page: number, size: number) {
    let slug = this.route.snapshot.params['slug']
    this.categoryService.getCategoryWithProducts(slug, page, size)
      .subscribe(category => this.categoryProducts = category)
  }

  get categoryName() {
    return this.categoryProducts ? this.categoryProducts.category.name : '';
  }

  get categoryDescription() {
    return this.categoryProducts ? this.categoryProducts.category.description : '';
  }

  onPageChange(event: PageEvent) {
    this.getCategoryWithProducts(event.pageIndex, event.pageSize);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
