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
          .catch(e => console.log(e))
        const season = response?.shift()?.pop()
        response?.map((element,i) => {
          if(!element[0]||!Number(element[1])) return
          data.push({name: element[0], pts: Number(element[1])||0, games: Number(element[2])||0, wins: Number(element[3])||0, losses: Number(element[4])||0, draws: Number(element[5])||0, winrate: element[6], rank: element[8], club: element.pop()||'-', season})
        })
        data.sort((a,b) => b.pts-a.pts)
        return data
    } catch(e) {
        throw createError('Something went wrong')
    }
})
