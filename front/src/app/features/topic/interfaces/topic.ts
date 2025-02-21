import {BaseCartItem} from "../../../core/models/interfaces/baseCartItem";


export interface Topic extends BaseCartItem {
  description: string;
  isSubscribed: boolean
}

