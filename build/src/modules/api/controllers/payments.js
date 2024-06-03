var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';
import { MomoPayment } from '../../../libs/MomoPayment.js';
import { ObjectId } from 'mongodb';
import { error } from 'console';
import { ZaloPayment } from '../../../libs/ZaloPayment.js';
let PaymentController = class PaymentController {
    OrderCollection;
    constructor(OrderCollection) {
        this.OrderCollection = OrderCollection;
    }
    async create(type, order_id) {
        console.log({ type, order_id });
        const order = await this.OrderCollection.findOne({ where: { _id: new ObjectId(order_id) } });
        if (!order) {
            throw new error('Không có đơn hàng nào');
        }
        if (type == 'momo') {
            try {
                const momo = new MomoPayment;
                const paymentResponse = await momo.createPayment({
                    amount: order.pay,
                    ipnUrl: 'https://payments.flygo.vn/livequery/webhooks/momo/~report',
                    orderId: order.id.toString(),
                    orderInfo: order.code,
                    redirectUrl: `http://localhost:3000/cart/payment/${order_id}`
                });
                console.log(JSON.stringify(paymentResponse, null, 2));
                return {
                    data: {
                        item: {
                            url: paymentResponse.payUrl
                        }
                    }
                };
            }
            catch (e) {
                throw new Error('Lỗi, vui lòng thử lại');
            }
        }
        if (type == 'zalopay') {
            try {
                const zalopay = new ZaloPayment;
                const paymentResponseZalo = await zalopay.createOrder({
                    amount: order.pay,
                    orderId: order.id.toString(),
                    redirectUrl: `http://localhost:3000/cart/payment/${order_id}`
                });
                console.log(JSON.stringify(paymentResponseZalo, null, 2));
                return {
                    data: {
                        item: {
                            url: paymentResponseZalo.order_url
                        }
                    }
                };
            }
            catch (error) {
                throw new Error('Lỗi, vui lòng thử lại');
            }
        }
    }
    async momo_confirm_payment(body, type) {
        console.log(JSON.stringify(body, null, 2));
        if (type == 'momo') {
            const momo = new MomoPayment;
            if (await momo.verifyPayment(body)) {
                await this.OrderCollection.updateOne({ _id: new ObjectId(body.orderId) }, { $set: { status: 'paid' } });
            }
        }
        if (type == 'zalopay') {
            await this.OrderCollection.updateOne({ _id: new ObjectId(body.orderId) }, { $set: { status: 'paid' } });
        }
    }
};
__decorate([
    Post('customers/:customer_id/orders/:id/~pay'),
    WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid),
    __param(0, Body('type')),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
__decorate([
    Post('webhooks/:type/~report'),
    __param(0, Body()),
    __param(1, Param('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "momo_confirm_payment", null);
PaymentController = __decorate([
    Controller('livequery'),
    __param(0, InjectRepository(Order)),
    __metadata("design:paramtypes", [MongoRepository])
], PaymentController);
export { PaymentController };
//# sourceMappingURL=payments.js.map