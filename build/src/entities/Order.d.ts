import { BaseEntity } from "./BaseEntity.js";
export declare class Order extends BaseEntity {
    name: string;
    status: string;
    image: string;
    orrder_item: Array<{
        product_id: string;
        amount: number;
        select: boolean;
    }>;
    amount: number;
    total: number;
    discount: number;
    pay: number;
    transport_fee: string | number;
    customer_id: string;
}
