import { BaseEntity } from "./BaseEntity.js";
export declare class Order extends BaseEntity {
    customer_id: string;
    restaurant_id: string;
    customer_name: string;
    table_id: string;
    status: string;
    status_detail: number;
    total: number;
    food_amount: number;
}
