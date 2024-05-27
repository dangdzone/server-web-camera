import { BaseEntity } from "./BaseEntity.js";
export declare class Order extends BaseEntity {
    name: string;
    status: string;
    image: string;
    order_item: Array<{
        product_id: string;
        amount: number;
        select: boolean;
    }>;
    amount: number;
    total: number;
    discount: number;
    pay: number;
    transport_fee: number;
    customer_id: string;
    receiver_info: {
        receiver_name: string;
        receiver_phone: number;
        province: number;
        district: number;
        ward: number;
        street: number;
        note: string;
    };
}
