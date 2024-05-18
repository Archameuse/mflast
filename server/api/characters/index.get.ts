import { and, desc, eq, sql } from "drizzle-orm"
import { heroes } from "~/db/schema"
import db from "~/server/utils/drizzle"

export default defineEventHandler(async event => {
    // const {lang}:{lang:string} = getQuery(event)    
    try {
        const characters = await db.query.heroes.findMany({
            orderBy: heroes.id
        }) as CharHolder[]
        return characters
    } catch(e) {
        throw createError('Something went wrong')
    }
})