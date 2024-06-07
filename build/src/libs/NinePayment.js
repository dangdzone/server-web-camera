import * as crypto from 'crypto';
export class NinePayment {
    MERCHANT_KEY = 'juAOxL';
    MERCHANT_SECRET_KEY = '3Je7RxfgIzbgbTyUX6uIa2FzhcQv1apHdap';
    END_POINT = 'https://sand-payment.9pay.vn';
    CHECKSUM_KEY = 'zlW20K17FMWpm9JhUH1PPSNDxqGLMZ97';
    async createPayment({ amount, description, return_url, invoice_no }) {
        const time = Math.round(Date.now() / 1000);
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
        };
        return directUrl;
    }
    buildHttpQuery(data) {
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
    buildSignature(data, secret) {
        const token = crypto.createHmac('sha256', secret).update(data).digest().toString('base64');
        return token;
    }
    async verifyNinePayment({ result, checksum }) {
        const decodedResult = this.decodeBase64(result);
        return {
            isValidChecksum: true,
            decodedResult,
        };
    }
    verifyChecksum(result, checksum) {
        const sha256Data = crypto.createHmac('sha256', this.CHECKSUM_KEY).update(result).digest('hex').toUpperCase();
        return sha256Data === checksum;
    }
    decodeBase64(base64String) {
        const buff = Buffer.from(base64String, 'base64');
        return buff.toString('ascii');
    }
}
//# sourceMappingURL=NinePayment.js.map