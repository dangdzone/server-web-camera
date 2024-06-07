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
import { Body, Controller, Get, Param, Post, Query, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';
import { MomoPayment } from '../../../libs/MomoPayment.js';
import { ObjectId } from 'mongodb';
import { error } from 'console';
import { ZaloPayment } from '../../../libs/ZaloPayment.js';
import { NinePayment } from '../../../libs/NinePayment.js';
let PaymentController = class PaymentController {
    OrderCollection;
    constructor(OrderCollection) {
        this.OrderCollection = OrderCollection;
    }
    async create(type, order_id) {
        console.log({ type, order_id });
        const order = await this.OrderCollection.findOne({ where: { _id: new ObjectId(order_id) } });
        if (!order) {
            throw new error('Không có đơn hàng nào !');
        }
        if (type == 'momo') {
            try {
                const momo = new MomoPayment;
                const responseMomoTransaction = await momo.createPayment({
                    orderId: order.id.toString(),
                    amount: order.pay,
                    orderInfo: order.code,
                    redirectUrl: `http://localhost:3000/member/histories/${order_id}`,
                    ipnUrl: 'https://payments.flygo.vn/livequery/webhooks/momo/~report',
                });
                console.log(JSON.stringify(responseMomoTransaction, null, 2));
                return {
                    data: {
                        item: {
                            url: responseMomoTransaction.payUrl
                        }
                    }
                };
            }
            catch (e) {
                throw new Error('Lỗi, vui lòng thử lại');
            }
        }
        if (type == 'zalo') {
            try {
                const zalopay = new ZaloPayment;
                const responseZaloTransaction = await zalopay.createOrder({
                    orderId: order.id.toString(),
                    amount: order.pay,
                    redirectUrl: `http://localhost:3000/member/histories/${order_id}`,
                    callback_url: 'https://payments.flygo.vn/livequery/webhooks/zalo/~report',
                });
                console.log(JSON.stringify(responseZaloTransaction, null, 2));
                return {
                    data: {
                        item: {
                            url: responseZaloTransaction.order_url
                        }
                    }
                };
            }
            catch (error) {
                throw new Error('Lỗi, vui lòng thử lại');
            }
        }
        if (type = 'ninepay') {
            try {
                const ninepay = new NinePayment;
                const responseNineTransaction = await ninepay.createPayment({
                    amount: order.pay,
                    description: order.id.toString(),
                    invoice_no: order.id.toString(),
                    return_url: `http://localhost:8080/livequery/webhooks/9pay/~report`,
                });
                console.log(JSON.stringify(responseNineTransaction, null, 2));
                console.log({ responseNineTransaction });
                return {
                    data: {
                        item: {
                            url: responseNineTransaction.payUrl
                        }
                    }
                };
            }
            catch (error) {
                throw new Error('Lỗi, vui lòng thử lại');
            }
        }
    }
    async momo_confirm_payment(body) {
        console.log(JSON.stringify(body, null, 2));
        const momo = new MomoPayment;
        if (await momo.verifyMomoPayment(body)) {
            await this.OrderCollection.updateOne({ _id: new ObjectId(body.orderId) }, { $set: { status: 'paid' } });
        }
    }
    async zalo_confirm_payment(body) {
        console.log({ body });
        const data = JSON.parse(body.data);
        console.log({ data });
        const zalo = new ZaloPayment;
        if (await zalo.verifyZaloPayment(body)) {
            await this.OrderCollection.updateOne({ _id: new ObjectId(data.app_user) }, { $set: { status: 'paid' } });
        }
    }
    async pay_9_confirm_payment(body) {
        const ninepay = new NinePayment;
        const info_pay = await ninepay.verifyNinePayment(body);
        const orderId = JSON.parse(info_pay.decodedResult);
        if (info_pay.isValidChecksum) {
            await this.OrderCollection.updateOne({ _id: new ObjectId(orderId.invoice_no) }, { $set: { status: 'paid' } });
        }
        return {
            url: `http://localhost:3000/member/histories/${orderId.invoice_no}`
        };
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
    Post('webhooks/momo/~report'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "momo_confirm_payment", null);
__decorate([
    Post('webhooks/zalo/~report'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "zalo_confirm_payment", null);
__decorate([
    Redirect(),
    Get('webhooks/9pay/~report'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "pay_9_confirm_payment", null);
PaymentController = __decorate([
    Controller('livequery'),
    __param(0, InjectRepository(Order)),
    __metadata("design:paramtypes", [MongoRepository])
], PaymentController);
export { PaymentController };
//# sourceMappingURL=payments.js.map