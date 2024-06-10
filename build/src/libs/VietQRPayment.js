export class VietQRPaymet {
    async responsePayment(body) {
        if (body.pkg == 'com.VCB') {
            const riceMatch = body.text.match(/\+(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?) VND/);
            const codeIdMatch = body.text.match(/Ref MBVCB\.\d+\.(\w+)\./);
            const rice = riceMatch ? parseFloat(riceMatch[1].replace(/,/g, '')) : null;
            const code = codeIdMatch ? codeIdMatch[1] : null;
            return { rice, code };
        }
    }
}
//# sourceMappingURL=VietQRPayment.js.map