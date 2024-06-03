export type ZaloRequest = {
    transID: number;
    amount: number;
    user: string;
    description: string;
};
export declare class ZaloPayment {
    private readonly config;
    createOrder(): Promise<any>;
}
