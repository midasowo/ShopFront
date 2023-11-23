import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  products = [
    {
      name: "Product 1",
      category: "Category 1",
      description: "Sample description 1",
      price: 11.99,
      currency: "PLN"
    },
    {
      name: "Product 2",
      category: "Category 2",
      description: "Sample description 2",
      price: 11.99,
      currency: "PLN"
    },
    {
      name: "Product 3",
      category: "Category 3",
      description: "Sample description 3",
      price: 11.99,
      currency: "PLN"
    }
  ];

}
