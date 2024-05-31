import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

export type MomoTransaction = {
    /** Mã đối tác */
    // partnerCode: string
    /** ID gửi đi */
    // requestId: string
    /** Số lượng */
    amount: number
    /** ID đơn hàng */
    orderId: string
    /** Thông tin đơn hàng */
    orderInfo: string
    /** Dữ liệu bổ sung */
    // extraData: string
    /** Mã hóa */
    // signature: string
}

export type MomoRequest = MomoTransaction & {
    /** Khóa xác thực */
    // accessKey: string
    /** URL chuyển hướng */
    redirectUrl: string
    /** URL trả dữ liệu */
    ipnUrl: string
    /** Kiểu request */
    // requestType: string
    /** Ngôn ngữ */
    // lang: string
}

export type MomoResponse = MomoTransaction & {
    /** Kiểu đơn hàng */
    orderType: string
    /** ID chuyển đổi */
    transId: string
    /** Kết quả đơn hàng */
    resultCode: number
    /** Nội dung tin nhắn */
    message: string
    /** Loạt thanh toán */
    payType: string
    /** Thời gian trả về */
    responseTime: number
}

export class MomoPayment {

    private readonly partnerCode = 'MOMO'
    private readonly accessKey = 'F8BBA842ECF85'
    private readonly secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'

    async createPayment({ amount, ipnUrl, orderId, orderInfo, redirectUrl }: MomoRequest) {

        const extraData = ''
        const requestType = "captureWallet"
        const requestId = this.partnerCode + new Date().getTime()
        const rawSignature = "accessKey=" + this.accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + this.partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType

        const signature = crypto.createHmac('sha256', this.secretkey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = JSON.stringify({
            partnerCode: this.partnerCode,
            accessKey: this.accessKey,
            requestId: requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData,
            requestType,
            signature: signature,
            lang: 'vi'
        })

        try {
            const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
            });
            return response.data as {
                payUrl: string
                deeplink: string
                qrCodeUrl: string
                resultCode: number
                responseTime: number
                message: string
            };
        } catch (error) {
            throw new HttpException('MoMo payment failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Xác thực chữ ký
    async verifyPayment({}: MomoResponse) {

        // Nếu hợp lệ => true
        return true
    }
}

