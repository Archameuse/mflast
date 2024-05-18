import { and, desc, eq, sql } from "drizzle-orm"
import { heroes } from "~/db/schema"
import db from "~/server/utils/drizzle"

export default defineEventHandler(async event => {
    const user = readCookie(event)
    const {character}:{character:Character} = await readBody(event)
    try {
        if(!user?.admin) throw new Error('Unauthorized access')
        if(!character) throw new Error('Invalid hero')
        await db.insert(heroes).values({
            heroRU:character
        })
        return 'success'
    } catch(e) {
        throw createError('Something went wrong')
    }
})