import {AdminOrderDetails} from "./adminOrderDetails"
import {AdminPayment} from "./adminPayment"

export interface AdminOrder {
  id: number,
  placeDate: Date,
  orderStatus: string,
  orderRows: AdminOrderDetails[]
  grossValue: number,
  firstname: string,
  lastname: string,
  street: string,
  zipcode: string,
  city: string,
  email: string,
  phone: string,
  payment: AdminPayment
}
