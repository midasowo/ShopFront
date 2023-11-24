import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ProductService} from "./product.service";
import {Product} from "./model/product";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  products: Product[] = []

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(products => this.products = products)
  }

}
