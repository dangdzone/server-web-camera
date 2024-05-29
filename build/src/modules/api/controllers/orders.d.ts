import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
import { Cart } from '../../../entities/Cart.js';
export declare class OrderController {
    private OrderCollection;
    private CartCollection;
    constructor(OrderCollection: MongoRepository<Order>, CartCollection: MongoRepository<Cart>);
    listALL(): Promise<void>;
    listCustomer(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
