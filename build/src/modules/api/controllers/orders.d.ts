import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
export declare class OrderController {
    private OrderCollection;
    constructor(OrderCollection: MongoRepository<Order>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
