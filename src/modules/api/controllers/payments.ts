
import { Body, Controller, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';
import { MomoPayment, MomoResponse } from '../../../libs/MomoPayment.js';
import { ObjectId } from 'mongodb';
import { error } from 'console';
import { ZaloPayment } from '../../../libs/ZaloPayment.js';

@Controller('livequery') // Đơn hàng
export class PaymentController {

    constructor(
        @InjectRepository(Order) private OrderCollection: MongoRepository<Order>,
    ) { }


    @Post('customers/:customer_id/orders/:id/~pay')
    @WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid)
    async create(
        @Body('type') type: string,
        @Param('id') order_id: string
    ) {

        console.log({ type, order_id })
        const order = await this.OrderCollection.findOne(
            { where: { _id: new ObjectId(order_id) } }
        )

        if (!order) {
            throw new error('Không có đơn hàng nào')
        }

        if (type == 'momo') {
            try {
                const momo = new MomoPayment
                const paymentResponse = await momo.createPayment({
                    amount: order.pay,
                    ipnUrl: 'https://payments.flygo.vn/livequery/webhooks/momo/~report',
                    orderId: order.id.toString(),
                    orderInfo: order.code,
                    redirectUrl: `http://localhost:3000/cart/payment/${order_id}`
                })
                console.log(JSON.stringify(paymentResponse, null, 2))
                return {
                    data: {
                        item: {
                            url: paymentResponse.payUrl
                        }
                    }
                }
            } catch (e) {
                throw new Error('Lỗi, vui lòng thử lại')
            }
        }

        if (type == 'zalopay') {
            try {
                const zalopay = new ZaloPayment
                const paymentResponseZalo = await zalopay.createOrder({
                    amount: order.pay,
                    orderId: order.id.toString(),
                    redirectUrl: `http://localhost:3000/cart/payment/${order_id}`
                })
                console.log(JSON.stringify(paymentResponseZalo, null, 2))
                return {
                    data: {
                        item: {
                            url: paymentResponseZalo.order_url
                        }
                    }
                }
            } catch (error) {
                throw new Error('Lỗi, vui lòng thử lại')
            }
        }
    }

    @Post('webhooks/:type/~report')
    async momo_confirm_payment(
        @Body() body: MomoResponse,
        @Param('type') type: string
    ) {
        console.log(JSON.stringify(body, null, 2))
        if (type == 'momo') {
            const momo = new MomoPayment
            if (await momo.verifyPayment(body)) {
                await this.OrderCollection.updateOne(
                    { _id: new ObjectId(body.orderId) },
                    { $set: { status: 'paid' } }
                )
            }
        }
        if (type == 'zalopay') {
            // const zalopay = new ZaloPayment
            await this.OrderCollection.updateOne(
                { _id: new ObjectId(body.orderId) },
                { $set: { status: 'paid' } }
            )
        }
    }
}