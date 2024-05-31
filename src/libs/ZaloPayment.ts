import dayjs from "dayjs";

export type ZaloRequest = {
    transID: number,
    amount: number,
    user: string,
    description: string
}

export class ZaloPayment {

    private readonly config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    }

    async createPayment({}: ZaloRequest) {

        const embed_data = {
            redirectUrl: ''
        }
        const items = [{}]
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: this.config.app_id,
            app_trans_id: `${dayjs().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: 50000,
            description: `Payment for the order #${transID}`,
            bank_code: "zalopayapp",
        };
    }


}