import {AdminProductDto} from "./adminProduct";
import {AdminShipmentDto} from "./adminShipmentDto";

export interface AdminOrderDetails {
  id: number,
  orderId: number,
  product: AdminProductDto,
  quantity: number,
  price: number,
  shipment: AdminShipmentDto
}
