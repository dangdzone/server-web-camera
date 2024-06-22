

export class VietQRPaymet {

    async responsePayment(body: any) {
        if (body.pkg == 'com.VCB') {

            const riceMatch = body.text.match(/\+(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?) VND/);
            const codeIdMatch = body.text.match(/FG\d+/);

            const rice = riceMatch ? parseFloat(riceMatch[1].replace(/,/g, '')) : null
            const code = codeIdMatch ? codeIdMatch[0] : null;

            console.log({ rice, code })

            return { rice, code }
        }
        
    }

}