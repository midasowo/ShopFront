import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ProductDetails} from "./model/product-details";
import {ProductDetailsService} from "./product-details.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product!: ProductDetails

  constructor(
    private productDetailsService: ProductDetailsService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getProductDetails()
  }

  getProductDetails() {
    let slug = this.router.snapshot.params['slug']
    this.productDetailsService.getProductDetails(slug)
      .subscribe(product => this.product = product)
  }

}
