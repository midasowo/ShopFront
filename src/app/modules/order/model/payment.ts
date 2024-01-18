import {PaymentType} from "./payment-type";

export interface Payment {
  id: number
  name: string
  type: PaymentType
  defaultPayment: boolean
  note: string
}
