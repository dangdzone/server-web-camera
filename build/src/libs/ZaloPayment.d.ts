export type ZaloRequest = {
    transID: number;
    amount: number;
    user: string;
    description: string;
};
export type ZaloResponse = {
    type: string;
};
interface Order {
    redirectUrl: string;
    orderId: string;
    amount: number;
}
export declare class ZaloPayment {
    private readonly config;
    createOrder({ orderId, amount, redirectUrl }: Order): Promise<any>;
}
export {};
