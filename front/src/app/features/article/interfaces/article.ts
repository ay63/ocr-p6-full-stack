import {BaseItem} from "../../../core/models/interfaces/baseItem";

export interface Article extends BaseItem {
    content: string;
    author: string;
    createdAt: string;
}

