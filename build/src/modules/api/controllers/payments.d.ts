import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
import { MomoResponse } from '../../../libs/MomoPayment.js';
export declare class PaymentController {
    private OrderCollection;
    constructor(OrderCollection: MongoRepository<Order>);
    create(type: string, order_id: string): Promise<{
        data: {
            item: {
                url: string;
            };
        };
    }>;
    momo_confirm_payment(body: MomoResponse, type: string): Promise<void>;
}
