import {Customer} from "./customer.model";
import {Delivers} from "./delivers.model";

export interface User{
  idUser: number
  login: string,
  passOfUser: string,
  email: string,
  firstname: string,
  lastname: string,
  telephone: string,
  role_id: number,
  is_active: boolean,
  delivers: Delivers[],
  customers: Customer[]
}
