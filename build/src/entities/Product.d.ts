import { BaseEntity } from "./BaseEntity.js";
export declare class Product extends BaseEntity {
    name: string;
    status: string;
    image: string;
    cost: number;
    price: number;
    advertising_price: number;
    brand_id: string;
    code: string;
    description: string;
    resolution_id: string;
    amount: number;
    infos: Array<{
        name: string;
        content: string;
    }>;
    specifications: Array<{
        name: string;
        technicals: Array<{
            name: string;
            content: string;
        }>;
    }>;
    category_id: string;
    outstandings: string[];
    option: Array<Object>;
}
