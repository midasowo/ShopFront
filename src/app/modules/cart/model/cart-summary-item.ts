import {CartProduct} from "./cart-product";

export interface CartSummaryItem {
  id: number,
  quantity: number,
  product: CartProduct,
  lineValue: number
}
