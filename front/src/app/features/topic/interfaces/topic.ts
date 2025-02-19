import {BaseItem} from "../../../core/models/interfaces/baseItem";


export interface Topic extends BaseItem {
  description: string;
  isSubscribed: boolean
}

