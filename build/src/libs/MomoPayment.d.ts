export type MomoTransaction = {
    amount: number;
    orderId: string;
    orderInfo: string;
};
export type MomoRequest = MomoTransaction & {
    redirectUrl: string;
    ipnUrl: string;
};
export type MomoResponse = MomoTransaction & {
    orderType: string;
    transId: string;
    resultCode: number;
    message: string;
    payType: string;
    responseTime: number;
};
export declare class MomoPayment {
    private readonly partnerCode;
    private readonly accessKey;
    private readonly secretkey;
    createPayment({ amount, ipnUrl, orderId, orderInfo, redirectUrl }: MomoRequest): Promise<{
        payUrl: string;
        deeplink: string;
        qrCodeUrl: string;
        resultCode: number;
        responseTime: number;
        message: string;
    }>;
    verifyPayment({}: MomoResponse): Promise<boolean>;
}
