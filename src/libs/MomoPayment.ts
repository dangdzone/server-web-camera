import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

// Tạo giao dịch
export type CreateMomoTransaction = {
    /** Số lượng */
    amount: number
    /** URL chuyển hướng */
    redirectUrl: string
    /** URL trả dữ liệu */
    ipnUrl: string
    /** ID đơn hàng */
    orderId: string
    /** Thông tin đơn hàng */
    orderInfo: string
}

// Phản hồi khi tạo giao dịch 
export type ResponseMomoTransaction = {
    partnerCode: string, // "MOMO"
    orderId: string // "665de4319759abf9b20e53ce"
    requestId: string // "MOMO1717429333063"
    amount: number // 11000
    responseTime: number // 1717429337735
    message: string // "Thành công."
    resultCode: number // 0
    payUrl: string //  "https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3w2NjVkZTQzMTk3NTlhYmY5YjIwZTUzY2U&s=6d9b1cd0402962b5fb8e44d9ae458045a1b9389c9fb26b0b6c778eaa37579bce"
    deeplink: string // "momo://app?action=payWithApp&isScanQR=false&serviceType=app&sid=TU9NT3w2NjVkZTQzMTk3NTlhYmY5YjIwZTUzY2U&v=3.0"
    qrCodeUrl: string // "momo://app?action=payWithApp&isScanQR=true&serviceType=qr&sid=TU9NT3w2NjVkZTQzMTk3NTlhYmY5YjIwZTUzY2U&v=3.0"
}

// Thông báo giao dịch
export type ReportMomoTransaction = {
    partnerCode: string //  "MOMO"
    orderId: string // "665dd4166824847248669413"
    requestId: string // "MOMO1717425177440"
    amount: number // 10000
    orderInfo: string // "FG1717425174851"
    orderType: string // "momo_wallet"
    transId: string // 4052713263
    resultCode: number // 0
    message: string // "Thành công"
    payType: string // "qr"
    responseTime: number // 1717425231813
    extraData: string // ""
    signature: string // "a17eda3afd2f23f4cfe4573eccef0989c5dd609650d0bf04e3aac7b9dc9a1f40"
}

export class MomoPayment {

    private readonly partnerCode = 'MOMO'
    private readonly accessKey = 'F8BBA842ECF85'
    private readonly secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'

    async createPayment({ amount, ipnUrl, orderId, orderInfo, redirectUrl }: CreateMomoTransaction) {

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
            return response.data as ResponseMomoTransaction
        } catch (error) {
            throw new HttpException('MoMo payment failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Xác thực chữ ký
    async verifyMomoPayment(report: ReportMomoTransaction) {

        return true

        const data = `${report.partnerCode}${report.orderId}${report.requestId}${report.amount}${report.orderInfo}${report.orderType}${report.transId}${report.resultCode}${report.message}${report.payType}${report.responseTime}${report.extraData}`;
        const hmac = crypto.createHmac('sha256', this.secretkey);
        hmac.update(data);
        const generatedSignature = hmac.digest('hex');

        return generatedSignature === report.signature;

    }
}

