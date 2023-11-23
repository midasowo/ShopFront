import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, SharedModule, FlexLayoutModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}
