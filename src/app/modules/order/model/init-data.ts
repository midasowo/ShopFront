import {Shipment} from "./shipment";
import {Payment} from "./payment";

export interface InitData {
  shipments: Shipment[]
  payments: Payment[]
}
