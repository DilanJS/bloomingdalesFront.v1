import {OrderQty} from "./order-qty.model";

export interface OrderDetails{

  fullName:string;
  address:string;
  contactNumber:string;
  orderProductQuantities:OrderQty[];

}
