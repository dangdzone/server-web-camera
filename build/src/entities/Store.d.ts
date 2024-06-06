import { BaseEntity } from "./BaseEntity.js";
export declare class Store extends BaseEntity {
    name: string;
    province: number | string;
    district: number | string;
    ward: number | string;
    street: number | string;
    link_map: string;
}
