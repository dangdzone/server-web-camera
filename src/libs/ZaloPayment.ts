import dayjs from "dayjs";
import axios from "axios";
import * as crypto from 'crypto';
import moment from "moment";

export type ZaloRequest = {
    transID: number,
    amount: number,
    user: string,
    description: string
}

interface Order {
    // app_id: string;
    // app_trans_id: string;
    // app_user: string;
    // app_time: number;
    // item: string;
    // embed_data: string;
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

    async createOrder() { 
        const transID = Math.floor(Math.random() * 1000000);

        const order = {
            app_id: this.config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // milliseconds
            item: '[]',
            embed_data: '{}',
            amount: 50000,
            description: `Payment for the order #${transID}`,
            bank_code: 'zalopayapp' 
        };
        const raw_hash = ['app_id', 'app_trans_id', 'app_user', 'amount', 'app_time', 'embed_data',  'item'].map(
            v =>  order[v]
        ).join('|')
 
        
        const mac = crypto.createHmac('sha256', this.config.key1)
        .update(raw_hash)
        .digest('hex')
        
        const data = {...order, mac}

        console.log({
            url: this.config.endpoint,
            body: JSON.stringify(data),
            mac,
            raw_hash 
        })

        try {
            const response = await axios.post(this.config.endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

}


const zalo = new ZaloPayment()
zalo.createOrder().then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);
})