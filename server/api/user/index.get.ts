import { eq, sql } from "drizzle-orm"
import { admins } from "~/db/schema"
import db from "~/server/utils/drizzle"
import readCookie from "~/server/utils/readCookie"

export default defineEventHandler<Promise<User|null>>(async event => {
    const user = readCookie(event)
    if(!user) return null
    const admin = await db.select({
        exists: sql<boolean>`true`
    }).from(admins).where(eq(admins.id, String(user.id))).limit(1).then((value) => !!value.length)
    user.admin = admin
    return user as User
})