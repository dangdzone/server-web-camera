import { Repository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
export declare class OrderController {
    private OrderCollection;
    constructor(OrderCollection: Repository<Order>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(status: string, restaurant_id: string): Promise<void>;
    list_orders_by_tables(restaurant_id: string, table_id: string): Promise<{
        data: {
            items: {
                id: string;
                customer_id: string;
                restaurant_id: string;
                customer_name: string;
                table_id: string;
                status: string;
                status_detail: number;
                total: number;
                food_amount: number;
                created_at: number;
                updated_at: number;
                owner_id: string;
                permissions: {
                    [permission: string]: string;
                };
            }[];
        };
    }>;
    del(): Promise<void>;
}
