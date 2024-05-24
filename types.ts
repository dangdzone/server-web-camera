
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
    address: string;
    link_map: string;
}
