import {ShipmentType} from "./shipment-type";

export interface Shipment {
  id: number,
  name: string,
  price: number,
  type: ShipmentType,
  defaultShipment: boolean
}
