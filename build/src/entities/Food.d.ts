import { BaseEntity } from "./BaseEntity.js";
export declare class Food extends BaseEntity {
    name: string;
    restaurant_id: string;
    category_id: string;
    images: string;
    description: string;
    price: number;
    amount: number;
    status: string;
}
