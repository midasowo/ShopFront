import {CartSummaryItem} from "./cart-summary-item";
import {Summary} from "./summary";

export interface CartSummary {
  id: number,
  items: CartSummaryItem[],
  summary: Summary
}
