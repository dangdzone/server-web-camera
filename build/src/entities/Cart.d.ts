import { BaseEntity } from "./BaseEntity.js";
export declare class Cart extends BaseEntity {
    customer_id: string;
    product_id: string;
    amount: number;
    select: boolean;
}
