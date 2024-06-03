import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
import { ReportMomoTransaction } from '../../../libs/MomoPayment.js';
import { ReportZaloTransaction } from '../../../libs/ZaloPayment.js';
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
    momo_confirm_payment(body: ReportMomoTransaction): Promise<void>;
    zalo_confirm_payment(body: ReportZaloTransaction): Promise<void>;
}
