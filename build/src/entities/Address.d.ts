import { BaseEntity } from "./BaseEntity.js";
export declare class Address extends BaseEntity {
    customer_id: string;
    name: string;
    phone: string;
    province: number | string;
    district: number;
    ward: number | string;
    street: number | string;
    default: boolean;
}
