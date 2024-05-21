import { BaseEntity } from "./BaseEntity.js";
export declare class Cart extends BaseEntity {
    product_list: Array<{
        product_id: string;
        amount: number;
        price: number;
        select: boolean;
    }>;
}
