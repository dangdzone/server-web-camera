import { BaseEntity } from "./BaseEntity.js";
export declare class Product extends BaseEntity {
    name: string;
    image: string;
    cost: number;
    price: number;
    advertising_price: number;
    brand_id: string;
    code: string;
    description: string;
    resolution_id: string;
    amount: number;
    specifications: Array<Object>;
    category_id: string;
    option: Array<Object>;
}
