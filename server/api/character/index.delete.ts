import { eq } from "drizzle-orm"
import { heroes } from "~/db/schema"
import db from "~/server/utils/drizzle"

export default defineEventHandler(async event => {
    const user = readCookie(event)
    const {id}:{id:string} = getQuery(event)
    try {
        if(!user?.admin) throw new Error('Unauthorized access')
        if(!Number(id)) throw new Error('Invalid hero')
        await db.delete(heroes).where(eq(heroes.id,Number(id)))
        return 'success'
    } catch(e) {
        throw createError('Something went wrong')
    }
})