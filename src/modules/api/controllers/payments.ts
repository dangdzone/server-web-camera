
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
import { VietQRPaymet } from '../../../libs/VietQRPayment.js';


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

        // console.log({ type, order_id })
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
                    redirectUrl: `https://flygo.dangdzone.site/member/histories/${order_id}`,
                    ipnUrl: 'https://api.dangdzone.site/livequery/webhooks/momo/~report',
                })
                // console.log(JSON.stringify(responseMomoTransaction, null, 2))
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
                    redirectUrl: `https://flygo.dangdzone.site/member/histories/${order_id}`,
                    callback_url: 'https://api.dangdzone.site/livequery/webhooks/zalo/~report'
                })
                // console.log(JSON.stringify(responseZaloTransaction, null, 2))
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
                    return_url: `https://api.dangdzone.site/livequery/webhooks/9pay/~report`
                })
                // console.log(JSON.stringify(responseNineTransaction, null, 2))
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

        // Thành công
        if (body.resultCode == 0) {
            const momo = new MomoPayment
            if (await momo.verifyMomoPayment(body)) {
                await this.OrderCollection.updateOne(
                    { _id: new ObjectId(body.orderId) },
                    { $set: { status: 'paid' } }
                )
            } else {
                throw new Error('Xác thực thất bại')
            }
        }

        // Giao dịch thất bại
        if(body.resultCode == 1003) {
            await this.OrderCollection.updateOne(
                { _id: new ObjectId(body.orderId) },
                { $set: { status: 'cancel' } }
            )

        }

    }

    @Post('webhooks/zalo/~report')
    async zalo_confirm_payment(
        @Body() body: ReportZaloTransaction
    ) {

        const data = JSON.parse(body.data)
        const zalo = new ZaloPayment
        const veryfy = await zalo.verifyZaloPayment(body)

        // Thành công
        if (veryfy.return_code == 1) {

            await this.OrderCollection.updateOne(
                { _id: new ObjectId(data.app_user) },
                { $set: { status: 'paid' } }
            )
        }

        // 	Thất bại
        if (veryfy.return_code == 2) {

            await this.OrderCollection.updateOne(
                { _id: new ObjectId(data.app_user) },
                { $set: { status: 'cancel' } }
            )

        }
        // try {
        //     const zalopay = new ZaloPayment
        //     const verify = await zalopay.verifyZaloPayment(body)
        //     if (verify.return_code == 1) {

        //         const data = JSON.parse(body.data)
        //         const order = await zalopay.queryTransaction(data.app_trans_id)

        //         if (order.return_code == 1) {
        //             await this.OrderCollection.updateOne(
        //                 { _id: new ObjectId(data.item.orderId) },
        //                 { $set: { status: 'paid' } }
        //             )
        //         }
        //     } else {
        //         throw new Error('Xác thực thất bại')
        //     }
        // } catch (error) {
        //     throw new Error('Lỗi ! Vui lòng thử lại.')
        // }

        // console.log(JSON.stringify(body, null, 2))


    }

    @Redirect()
    @Get('webhooks/9pay/~report')
    async pay_9_confirm_payment(
        @Query() body: ReportNinePayTransaction,
    ) {

        const ninepay = new NinePayment
        const info_pay = await ninepay.verifyNinePayment(body)
        const orderId = this.cleanAndParseJSON(info_pay.decodedResult)

        // Giao dịch thành công và merchant đã được cộng số dư
        if (orderId.status == 5) {

            if (info_pay.isValidChecksum) {

                await this.OrderCollection.updateOne(
                    { _id: new ObjectId(orderId.invoice_no) },
                    { $set: { status: 'paid' } }
                )
                return {
                    url: `https://flygo.dangdzone.site/member/histories/${orderId.invoice_no}`
                }

            } else {
                throw new Error('Xác thực thất bại')
            }

        }

        // Giao dịch bị hủy do khách hàng
        if (orderId.status == 8) {
            console.log('Giao dịch bị hủy')
            return {
                url: `https://flygo.dangdzone.site/member/histories/${orderId.invoice_no}`
            }
        }

        // Giao dịch thất bại
        if (orderId.status == 6) {

            await this.OrderCollection.updateOne(
                { _id: new ObjectId(orderId.invoice_no) },
                { $set: { status: 'cancel' } }
            )
            return {
                url: `https://flygo.dangdzone.site/member/histories/${orderId.invoice_no}`
            }
        }

    }

    // Loại bỏ `...` => '...'
    private cleanAndParseJSON(jsonString: string): any {
        try {
            // Loại bỏ các ký tự điều khiển không hợp lệ
            const cleanedString = jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
            // Phân tích cú pháp chuỗi JSON
            const parsedResult = JSON.parse(cleanedString);
            return parsedResult;
        } catch (error) {
            console.error('Failed to parse decodedResult:', error);
            return null;
        }
    }

    @Post('webhooks/vietqr/~report')
    async vietqr_confirm_payment(
        @Body() body,
    ) {

        const vietqr = new VietQRPaymet
        const reponse = await vietqr.responsePayment(body)

        // Tìm đơn hàng có mã code, pay == body..... gửi về
        const order = await this.OrderCollection.findOne(
            { where: { code: reponse.code, pay: reponse.rice } }
        )

        if (order) {
            await this.OrderCollection.updateOne(
                { _id: new ObjectId(order.id) },
                { $set: { status: 'paid' } }
            )
        }

    }
}
