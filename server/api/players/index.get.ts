import {google} from 'googleapis'

export default defineEventHandler(async (event) => {
    try {
        const auth = new google.auth.GoogleAuth({
          credentials: JSON.parse(process.env.DB_KEY),
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        })
        // const client = await auth.getClient();
        const sheets = google.sheets({version:'v4',auth});
        const range = process.env.DB_PLAYERS_RANGE
        const data:Player[] = []
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: process.env.DB_PLAYERS_ID,
          range
        }).then(res => res.data.values)
        const season = response?.shift()?.pop()
        response?.map((element) => {
          if(!element[0]) return
          data.push({name: element[0], pts: JSON.parse(element[1]), games: JSON.parse(element[2]), wins: JSON.parse(element[3]), losses: JSON.parse(element[4]), draws: JSON.parse(element[5]), winrate: element[6], rank: element[7], club: element.pop(), season})
        })
        return data
    } catch(e) {
        throw createError('Something went wrong')
    }
})
