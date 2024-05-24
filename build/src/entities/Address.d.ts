import { BaseEntity } from "./BaseEntity.js";
export declare class Address extends BaseEntity {
    order_id: string;
    receiver_name: string;
    receiver_phone: number;
    province: string;
    district: string;
    ward: string;
    street: string;
    note: string;
}
