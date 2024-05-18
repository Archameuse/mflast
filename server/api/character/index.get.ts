import { and, desc, eq, sql } from "drizzle-orm"
import { heroes } from "~/db/schema"
import db from "~/server/utils/drizzle"

export default defineEventHandler(async event => {
    const {id,lang}:{id:string,lang:string} = getQuery(event)   
    try {
        if(!Number(id)) throw new Error("Invalid id")
        const prev = Number(id)>1 ? sql<Character>`(select ${lang==='en' ? heroes.heroEN : heroes.heroRU} from "heroes" order by "heroes"."id" offset ${Number(id)-2} limit 1)`.as('prev') : sql`false`.as('prev')
        const next = sql<Character>`(select ${lang==='en' ? heroes.heroEN : heroes.heroRU} from "heroes" order by "heroes"."id" offset ${Number(id)} limit 1)`.as('next')
        const character = await db.query.heroes.findFirst({
            orderBy: heroes.id,
            extras: {
                prev: prev,
                next: next,
            },
            offset: Number(id)-1
        }) as CharHolder
        return character
    } catch(e) {
        throw createError('Something went wrong')
    }
})