export type CreateZaloTransaction = {
    redirectUrl: string;
    orderId: string;
    amount: number;
    callback_url: string;
};
export type ResponseZaloTransaction = {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    order_url: string;
    zp_trans_token: string;
    order_token: string;
    qr_code: string;
};
export type ReportZaloTransaction = {
    data: string;
    mac: string;
    type: string;
};
export type QueryZaloTransaction = {
    app_trans_id: string;
};
export declare class ZaloPayment {
    private readonly config;
    createOrder({ orderId, amount, redirectUrl, callback_url }: CreateZaloTransaction): Promise<ResponseZaloTransaction>;
    verifyZaloPayment({ data, mac, type }: ReportZaloTransaction): Promise<boolean>;
    queryTransaction({ app_trans_id }: QueryZaloTransaction): Promise<{
        return_code: number;
    }>;
}
