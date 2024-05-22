import { BaseEntity } from "./BaseEntity.js";
export declare class Cart extends BaseEntity {
    product_id: string;
    amount: number;
    select: boolean;
}
