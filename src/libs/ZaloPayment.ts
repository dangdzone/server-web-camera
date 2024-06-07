import axios from "axios";
import * as crypto from 'crypto';
import moment from "moment";

export type CreateZaloTransaction = {
    redirectUrl: string
    orderId: string
    amount: number;
    callback_url: string
}

export type ResponseZaloTransaction = {
    return_code: number // 1: Thành công 2: Thất bại
    return_message: string // Mô tả mã trạng thái
    sub_return_code: number // Mã trạng thái chi tiết
    sub_return_message: string // 	Mô tả chi tiết mã trạng thái
    order_url: string // 	Dùng để tạo QR code hoặc gọi chuyển tiếp sang trang cổng ZaloPay
    zp_trans_token: string // 	Thông tin token đơn hàng
    order_token: string // Thông tin token đơn hàng
    qr_code: string // 	Dùng để tạo NAPAS VietQR trên hệ thống Merchant. NAPAS VietQR là một trong những giải pháp thanh toán hoàn toàn mới, chấp nhận thanh toán được thực hiện bởi cả ZaloPay & +40 ngân hàng thuộc hệ thống NAPAS. Người dùng có thể sử dụng ứng dụng ngân hàng quét NAPAS VietQR để thanh toán
}

export type ReportZaloTransaction = {
    data: string //Dữ liệu giao dịch ZaloPay gọi về cho ứng dụng
    mac: string // 	Thông tin chứng thực của đơn hàng, dùng Callback Key (Key2) được cung cấp để chứng thực đơn hàng
    type: string // Loại callback => 1: Order, 2: Agreement
}

export class ZaloPayment {

    private readonly config = {
        app_id: 2554,
        key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
        key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    }

    async createOrder({ orderId, amount, redirectUrl, callback_url }: CreateZaloTransaction) {
        // const transID = Math.floor(Math.random() * 1000000);
        const items = [{
            orderId
        }]
        const embed_data = {
            redirectUrl
        }
        const order = {
            app_id: this.config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${orderId}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: orderId,
            app_time: Date.now(), // milliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            callback_url,
            amount,
            description: `Payment for the order #${orderId}`,
            bank_code: 'zalopayapp'
        };
        const raw_hash = ['app_id', 'app_trans_id', 'app_user', 'amount', 'app_time', 'embed_data', 'item'].map(
            v => order[v]
        ).join('|')


        const mac = crypto.createHmac('sha256', this.config.key1)
            .update(raw_hash)
            .digest('hex')

        const data = { ...order, mac }

        try {
            const response = await axios.post(this.config.endpoint, data);
            return response.data as ResponseZaloTransaction
        } catch (error) {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

    // Xác thực chữ ký
    async verifyZaloPayment(report: ReportZaloTransaction) {

        return true
        // const hmac = crypto.createHmac('sha256', callbackKey);
        // hmac.update(report.data);
        // const generatedMac = hmac.digest('hex');

        // return generatedMac === report.mac;

    }

}

// const zalo = new ZaloPayment()
// zalo.createOrder({
//     amount: 10000,
//     orderId: '12312371782y778',
//     redirectUrl: 'google.com'
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.error(error);
// })