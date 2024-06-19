import { BaseEntity } from "./BaseEntity.js";
export declare class Order extends BaseEntity {
    code: string;
    status: string;
    order_items: Array<{
        product_id: string;
        amount: number;
        select: boolean;
    }>;
    amount: number;
    total: number;
    discount: number;
    pay: number;
    shipping_fee: number;
    customer_id: string;
    customer_info: {
        name: string;
        email: string;
        img: string;
    };
    address_id: string;
    note: string;
}
