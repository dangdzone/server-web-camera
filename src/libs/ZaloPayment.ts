import axios from "axios";
import * as crypto from 'crypto';
import moment from "moment";

export type ZaloRequest = {
    transID: number,
    amount: number,
    user: string,
    description: string
}

export type ZaloResponse = {
    type: string
}

interface Order {
    // app_id: string;
    // app_trans_id: string;
    // app_user: string;
    // app_time: number;
    // item: string;
    // embed_data: string;
    redirectUrl: string
    orderId: string
    amount: number;
    // description: string;
    // bank_code: string;
    // mac?: string;  // Khai báo thuộc tính mac là tùy chọn
}

export class ZaloPayment {

    private readonly config = {
        app_id: 2554,
        key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
        key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    }

    async createOrder({ orderId, amount, redirectUrl }: Order) {
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
            return response.data
        } catch (error) {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

    // Xác thực chữ ký
    // async verifyPaymentZalo({ body }: any) {
    //     const result: any = {}
    //     // Nếu hợp lệ => true
    //     const config = {
    //         key2: "eG4r0GcoNtRGbO8"
    //     };

    //     try {
    //         const dataStr = body.data;
    //         const reqMac = body.mac;

    //         const mac = crypto.createHmac('sha256', config.key2)
    //             .update(dataStr)
    //             .digest('hex');

    //         // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    //         if (reqMac !== mac) {
    //             // callback không hợp lệ
    //             result.return_code = -1;
    //             result.return_message = 'mac not equal';
    //         } else {
    //             // thanh toán thành công
    //             // merchant cập nhật trạng thái cho đơn hàng
    //             const dataJson = JSON.parse(dataStr, config.key2);
    //             console.log("update order's status = success where app_trans_id =", dataJson['app_trans_id']);

    //             result.return_code = 1;
    //             result.return_message = 'success';
    //         }
    //     } catch (ex) {
    //         result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    //         result.return_message = ex.message;
    //     }

    //     // thông báo kết quả cho ZaloPay server
    //     res.json(result);
    // }
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