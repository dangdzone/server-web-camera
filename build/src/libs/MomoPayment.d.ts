export type CreateMomoTransaction = {
    amount: number;
    redirectUrl: string;
    ipnUrl: string;
    orderId: string;
    orderInfo: string;
};
export type ResponseMomoTransaction = {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: number;
    responseTime: number;
    message: string;
    resultCode: number;
    payUrl: string;
    deeplink: string;
    qrCodeUrl: string;
};
export type ReportMomoTransaction = {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: number;
    orderInfo: string;
    orderType: string;
    transId: string;
    resultCode: number;
    message: string;
    payType: string;
    responseTime: number;
    extraData: string;
    signature: string;
};
export declare class MomoPayment {
    private readonly partnerCode;
    private readonly accessKey;
    private readonly secretkey;
    createPayment({ amount, ipnUrl, orderId, orderInfo, redirectUrl }: CreateMomoTransaction): Promise<ResponseMomoTransaction>;
    verifyMomoPayment({}: ReportMomoTransaction): Promise<boolean>;
}
