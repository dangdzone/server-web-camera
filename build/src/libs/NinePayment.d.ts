export type CreateNinePayTransaction = {
    amount: number;
    description: string;
    return_url: string;
    invoice_no: string;
};
export type ResponseNinePayTransaction = {
    payUrl: string;
};
export type ReportNinePayTransaction = {
    result: string;
    checksum: string;
};
export declare class NinePayment {
    private readonly MERCHANT_KEY;
    private readonly MERCHANT_SECRET_KEY;
    private readonly END_POINT;
    private readonly CHECKSUM_KEY;
    createPayment({ amount, description, return_url, invoice_no }: CreateNinePayTransaction): Promise<{
        payUrl: string;
    }>;
    private buildHttpQuery;
    private buildSignature;
    verifyNinePayment({ result, checksum }: ReportNinePayTransaction): Promise<{
        isValidChecksum: boolean;
        decodedResult: string;
    }>;
    private verifyChecksum;
    private decodeBase64;
}
