import {Order} from "./order.model";

export interface Customer {
  idCustomer: number,
  firstnameOfCustomer: string,
  lastnameOfCustomer: string,
  customerPhone: string,
  longitude: number;
  latitude: number;
  orders: Array<Order>;
}
