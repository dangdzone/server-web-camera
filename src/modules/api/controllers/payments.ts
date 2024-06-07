
import { Body, Controller, Get, Param, Post, Query, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Order } from '../../../entities/Order.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';
import { MomoPayment, ReportMomoTransaction } from '../../../libs/MomoPayment.js';
import { ObjectId } from 'mongodb';
import { error } from 'console';
import { ReportZaloTransaction, ZaloPayment } from '../../../libs/ZaloPayment.js';
import { NinePayment, ReportNinePayTransaction } from '../../../libs/NinePayment.js';

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
            throw new error('Không có đơn hàng nào !')
        }

        if (type == 'momo') {
            try {
                const momo = new MomoPayment
                const responseMomoTransaction = await momo.createPayment({
                    orderId: order.id.toString(),
                    amount: order.pay,
                    orderInfo: order.code,
                    redirectUrl: `http://localhost:3000/member/histories/${order_id}`,
                    ipnUrl: 'https://payments.flygo.vn/livequery/webhooks/momo/~report',
                    // ipnUrl: 'http://localhost:8080/livequery/webhooks/momo/~report',
                })
                console.log(JSON.stringify(responseMomoTransaction, null, 2))
                return {
                    data: {
                        item: {
                            url: responseMomoTransaction.payUrl
                        }
                    }
                }
            } catch (e) {
                throw new Error('Lỗi, vui lòng thử lại')
            }
        }

        if (type == 'zalo') {
            try {
                const zalopay = new ZaloPayment
                const responseZaloTransaction = await zalopay.createOrder({
                    orderId: order.id.toString(),
                    amount: order.pay,
                    redirectUrl: `http://localhost:3000/member/histories/${order_id}`,
                    callback_url: 'https://payments.flygo.vn/livequery/webhooks/zalo/~report',
                    // callback_url: 'http://localhost:8080/livequery/webhooks/zalo/~report'
                })
                console.log(JSON.stringify(responseZaloTransaction, null, 2))
                return {
                    data: {
                        item: {
                            url: responseZaloTransaction.order_url
                        }
                    }
                }
            } catch (error) {
                throw new Error('Lỗi, vui lòng thử lại')
            }
        }

        if (type = 'ninepay') {
            try {
                const ninepay = new NinePayment
                const responseNineTransaction = await ninepay.createPayment({
                    amount: order.pay,
                    description: order.id.toString(),
                    invoice_no: order.id.toString(),
                    return_url: `http://localhost:8080/livequery/webhooks/9pay/~report`,
                })
                console.log(JSON.stringify(responseNineTransaction, null, 2))
                console.log({responseNineTransaction})
                return {
                    data: {
                        item: {
                            url: responseNineTransaction.payUrl
                        }
                    }
                }
            } catch (error) {
                throw new Error('Lỗi, vui lòng thử lại')
            }
        }
    }

    @Post('webhooks/momo/~report')
    async momo_confirm_payment(
        @Body() body: ReportMomoTransaction,
        // @Param('type') type: string
    ) {

        console.log(JSON.stringify(body, null, 2))

        const momo = new MomoPayment
        if (await momo.verifyMomoPayment(body)) {
            await this.OrderCollection.updateOne(
                { _id: new ObjectId(body.orderId) },
                { $set: { status: 'paid' } }
            )
        }
    }

    @Post('webhooks/zalo/~report')
    async zalo_confirm_payment(
        @Body() body: ReportZaloTransaction
    ) {

        // console.log(JSON.stringify(body, null, 2))
        console.log({ body })
        const data = JSON.parse(body.data)
        console.log({ data })

        const zalo = new ZaloPayment

        if (await zalo.verifyZaloPayment(body)) {
            await this.OrderCollection.updateOne(
                { _id: new ObjectId(data.app_user) },
                { $set: { status: 'paid' } }
            )
        }
    }

    @Redirect()
    @Get('webhooks/9pay/~report')
    async pay_9_confirm_payment(
        @Query() body: ReportNinePayTransaction,
    ) {
        
        const ninepay = new NinePayment
        const info_pay = await ninepay.verifyNinePayment(body)
        const orderId = JSON.parse(info_pay.decodedResult)

        if(info_pay.isValidChecksum) {

            await this.OrderCollection.updateOne(
                { _id: new ObjectId(orderId.invoice_no) },
                { $set: { status: 'paid' } }
            )
            
        }

        return {
            url: `http://localhost:3000/member/histories/${orderId.invoice_no}`
        }

    }
}