import { MongoRepository } from 'typeorm';
import { OrderItem } from '../../../entities/OrderItem.js';
import { Food } from '../../../entities/Food.js';
import { Order } from '../../../entities/Order.js';
export declare class OrderItemController {
    private OrderItemCollection;
    private FoodCollection;
    private OrderCollection;
    constructor(OrderItemCollection: MongoRepository<OrderItem>, FoodCollection: MongoRepository<Food>, OrderCollection: MongoRepository<Order>);
    list(): Promise<void>;
    post(body: OrderItem, order_id: string): Promise<{
        data: {
            item: OrderItem;
        };
    }>;
    patch(body: OrderItem): Promise<{
        data: {
            item: import("typeorm").Document | import("typeorm/driver/mongodb/typings.js").UpdateResult;
        };
    }>;
    del(): Promise<void>;
}
