import {BaseCartItem} from "../../../core/models/interfaces/baseCartItem";

export interface Article extends BaseCartItem {
    content: string;
    author: string;
    createdAt: string;
}

