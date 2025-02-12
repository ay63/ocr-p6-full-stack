import {BaseItem} from "./baseItem";

export interface Article extends BaseItem {
    content: string;
    author: string;
    createdAt: string;
}
