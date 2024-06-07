export type PermissionList = string;
export type UserPermissions = {
    [user_uid: string]: PermissionList;
};
export declare class BaseEntity {
    constructor();
    id: string;
    created_at: number;
    updated_at: number;
    permissions: {
        [permission: string]: string;
    };
}
export declare class Brand extends BaseEntity {
    name: string;
    image: string;
}
export declare class Cart extends BaseEntity {
    customer_id: string;
    product_id: string;
    amount: number;
    select: boolean;
}
export declare class Category extends BaseEntity {
    name: string;
    image: string;
    href: string;
}
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
    receiver_info: {
        receiver_name: string;
        receiver_phone: number;
        province: number | string;
        district: number;
        ward: number | string;
        street: number | string;
        note: string;
    };
}
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
export declare class Resolution extends BaseEntity {
    name: string;
    size: string;
    note: string;
}
export declare class Store extends BaseEntity {
    name: string;
    province: number | string;
    district: number | string;
    ward: number | string;
    street: number | string;
    link_map: string;
}
