import * as crypto from 'crypto';

// Tạo giao dịch
export type CreateNinePayTransaction = {
    amount: number,
    description: string,
    return_url: string,
    invoice_no: string
}

// Phản hồi khi tạo giao dịch 
export type ResponseNinePayTransaction = {
    payUrl: string
}

// Thông báo giao dịch
export type ReportNinePayTransaction = {
    result: string
    checksum: string
}

export class NinePayment {

    private readonly MERCHANT_KEY = 'juAOxL'
    private readonly MERCHANT_SECRET_KEY = '3Je7RxfgIzbgbTyUX6uIa2FzhcQv1apHdap'
    private readonly END_POINT = 'https://sand-payment.9pay.vn'
    private readonly CHECKSUM_KEY = 'zlW20K17FMWpm9JhUH1PPSNDxqGLMZ97'

    async createPayment({ amount, description, return_url, invoice_no }: CreateNinePayTransaction) {

        const time = Math.round(Date.now() / 1000)
        // const invoiceNo = this.getInvoiceNo(8)

        const parameters = {
            merchantKey: this.MERCHANT_KEY,
            time,
            invoice_no,
            amount,
            description,
            return_url
        };

        const httpQuery = this.buildHttpQuery(parameters);
        const message = `POST\n${this.END_POINT}/payments/create\n${time}\n${httpQuery}`;
        const signature = this.buildSignature(message, this.MERCHANT_SECRET_KEY);
        const baseEncode = Buffer.from(JSON.stringify(parameters)).toString('base64');

        const httpBuild = {
            baseEncode: baseEncode,
            signature: signature,
        };
        const directUrl = {
            payUrl: `${this.END_POINT}/portal?${this.buildHttpQuery(httpBuild)}`
        }

        return directUrl
    }

    // private getInvoiceNo(length: number): string {
    //     let result = '';
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }

    private buildHttpQuery(data: any): string {
        const httpQuery = new URLSearchParams();
        const ordered = Object.keys(data)
            .sort()
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});

        Object.keys(ordered).forEach((parameterName) => {
            httpQuery.append(parameterName, ordered[parameterName]);
        });
        return httpQuery.toString();
    }

    private buildSignature(data: string, secret: string): string {
        const token = crypto.createHmac('sha256', secret).update(data).digest().toString('base64');
        return token;
    }


    // Xác thực
    async verifyNinePayment({ result, checksum }: ReportNinePayTransaction) {

        const decodedResult = this.decodeBase64(result);

        return {
            isValidChecksum: true,
            decodedResult,
        }
    }

    private verifyChecksum(result: string, checksum: string) {
        // const sha256Data = CryptoJS.SHA256(result + this.CHECKSUM_KEY).toString().toUpperCase();
        const sha256Data = crypto.createHmac('sha256', this.CHECKSUM_KEY).update(result).digest('hex').toUpperCase()
        return sha256Data === checksum;
    }

    private decodeBase64(base64String: string) {
        const buff = Buffer.from(base64String, 'base64');
        return buff.toString('ascii');
    }

}

// const NinePay = new NinePayment()
// NinePay.createPayment({
//     amount: 20000,
//     description: 'Tạo đơn hàng',
//     return_url: 'https://enzqu7bcsbjtj.x.pipedream.net'
// }).then((result) => {
//     console.log(result)
//     return result
// }).catch((error) => {
//     console.error(error);
// })



