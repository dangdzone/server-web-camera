import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
import { Cart } from '../../../entities/Cart.js';
export declare class OrderController {
    private OrderCollection;
    private CartCollection;
    constructor(OrderCollection: MongoRepository<Order>, CartCollection: MongoRepository<Cart>);
    list(): Promise<void>;
    create(body: Order): Promise<{
        data: {
            item: Order;
        };
    }>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
