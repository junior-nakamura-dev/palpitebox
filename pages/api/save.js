import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCoupom = () => {
    const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
    return `${code.substring(0, 4)}-${code.substring(4, 8)}-${code.substring(8, 12)}`;
}

export default async (req, res) => {
    try {
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: process.env.SHEET_PRIVATE_KEY
        })
        await doc.loadInfo()

        const sheet = doc.sheetsByIndex[1]
        //Name	Email	Whatsapp	Coupom	Promo

        const sheetConfiguration = doc.sheetsByIndex[2]
        await sheetConfiguration.loadCells('A2:B2')

        const hasCoupom = sheetConfiguration.getCell(1, 0).value
        const message = sheetConfiguration.getCell(1, 1).value

        let Coupom = ''
        let Promo = ''
        if (hasCoupom) {
            Coupom = genCoupom()
            Promo = message
        }
        const body = JSON.parse(req.body)

        await sheet.addRow({
            Name: body['Name'],
            Email: body['Email'],
            Whatsapp: body['Whatsapp'],
            'Date of answer': moment().format('DD/MM/YYYY HH:mm:ss'),
            Coupom,
            Promo,
            Rating: body['Rating']

        })
        res.end(JSON.stringify({
            showCoupom: Coupom !== '',
            Coupom,
            Promo
        }))
    } catch (error) {
        res.end(JSON.stringify(error))
    }
}