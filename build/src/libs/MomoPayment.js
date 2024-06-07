import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
export class MomoPayment {
    partnerCode = 'MOMO';
    accessKey = 'F8BBA842ECF85';
    secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    async createPayment({ amount, ipnUrl, orderId, orderInfo, redirectUrl }) {
        const extraData = '';
        const requestType = "captureWallet";
        const requestId = this.partnerCode + new Date().getTime();
        const rawSignature = "accessKey=" + this.accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + this.partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
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
        });
        try {
            const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
            });
            return response.data;
        }
        catch (error) {
            throw new HttpException('MoMo payment failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyMomoPayment(report) {
        return true;
        const data = `${report.partnerCode}${report.orderId}${report.requestId}${report.amount}${report.orderInfo}${report.orderType}${report.transId}${report.resultCode}${report.message}${report.payType}${report.responseTime}${report.extraData}`;
        const hmac = crypto.createHmac('sha256', this.secretkey);
        hmac.update(data);
        const generatedSignature = hmac.digest('hex');
        return generatedSignature === report.signature;
    }
}
//# sourceMappingURL=MomoPayment.js.map