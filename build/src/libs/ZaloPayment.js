import axios from "axios";
import * as crypto from 'crypto';
import moment from "moment";
import * as qs from 'qs';
export class ZaloPayment {
    config = {
        app_id: 2554,
        key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
        key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };
    async createOrder({ orderId, amount, redirectUrl, callback_url }) {
        const items = [{
                orderId
            }];
        const embed_data = {
            redirectUrl
        };
        const order = {
            app_id: this.config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${orderId}`,
            app_user: orderId,
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            callback_url,
            amount,
            description: `Payment for the order #${orderId}`,
            bank_code: 'zalopayapp'
        };
        const raw_hash = ['app_id', 'app_trans_id', 'app_user', 'amount', 'app_time', 'embed_data', 'item'].map(v => order[v]).join('|');
        const mac = crypto.createHmac('sha256', this.config.key1)
            .update(raw_hash)
            .digest('hex');
        const data = { ...order, mac };
        try {
            const response = await axios.post(this.config.endpoint, data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }
    async verifyZaloPayment({ data, mac, type }) {
        const result = { return_code: 1, return_message: 'success' };
        return result;
    }
    async queryTransaction({ app_trans_id }) {
        const postData = {
            app_id: this.config.app_id,
            app_trans_id,
        };
        const data = `${postData.app_id}|${postData.app_trans_id}|${this.config.key1}`;
        postData['mac'] = crypto.createHmac(data, this.config.key1).toString();
        const postConfig = {
            method: 'post',
            url: 'https://sb-openapi.zalopay.vn/v2/query',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(postData),
        };
        try {
            const response = await axios(postConfig);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=ZaloPayment.js.map