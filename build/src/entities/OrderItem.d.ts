import { BaseEntity } from "./BaseEntity.js";
export declare class OrderItem extends BaseEntity {
    restaurant_id: string;
    name: string;
    price: number;
    table_id: string;
    creator_id: string;
    creator_name: string;
    food_id: string;
    amount: number;
    image: string;
    order_id: string;
    customer_id: string;
    status: string;
    description: string;
}
