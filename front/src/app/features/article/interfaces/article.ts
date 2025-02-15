import {BaseItem} from "../../../core/interfaces/baseItem";

export interface Article extends BaseItem {
    content: string;
    author: string;
    createdAt: string;
}

