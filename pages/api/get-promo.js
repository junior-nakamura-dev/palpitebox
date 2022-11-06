import { GoogleSpreadsheet } from "google-spreadsheet"

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export default async (req, res) => {
    try {
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: process.env.SHEET_PRIVATE_KEY
        })
        await doc.loadInfo()
        console.log(doc.title)

        const sheet = doc.sheetsByIndex[2]
        await sheet.loadCells('A2:B2')
        console.log(sheet.title)

        const hasCoupom = sheet.getCell(1, 0).value
        const message = sheet.getCell(1, 1).value

        console.log(hasCoupom)
        console.log(message)

        res.end(JSON.stringify({
            showCoupom: hasCoupom,
            coupomMessage: message
        }))

    } catch (error) {
        res.end(JSON.stringify({
            showCoupom: false,
        }))

    }
}