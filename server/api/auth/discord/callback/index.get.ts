import axios from "axios"
import { eq, sql } from "drizzle-orm"
import jwt from 'jsonwebtoken'
import { admins } from "~/db/schema"
import db from "~/server/utils/drizzle"

export default defineEventHandler(async (event) => {
    // return 'asd'
    const {code}:{code:string} = getQuery(event)
    try{
        if(!code) throw new Error("Invalid code")
        const options = {
            url: 'https://discord.com/api/oauth2/token',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              'client_id': process.env.DISCORD_CLIENT_ID,
              'client_secret': process.env.DISCORD_CLIENT_SECRET,
              'grant_type': 'client_credentials',
              'code': code.toString(),
              'scope': 'identify'
            })
          }
          
        const resp = await fetch('https://discord.com/api/oauth2/token', options).then((response) => {
            return response.json();
        })
        if(!resp?.access_token) throw new Error('Access token not provided')
        const userResp = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${resp.access_token}`
        }}).then((response) => response.json())
        const user:User = {
            id: userResp.id,
            username: userResp.global_name,
        }
        const admin = await db.select({
            exists: sql<boolean>`true`
        }).from(admins).where(eq(admins.id, String(user.id))).limit(1).then((value) => !!value.length)
        user.admin = admin
        const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '1h'})
        setCookie(event, process.env.USER_COOKIE, token, {
            httpOnly: true
        })
        return await sendRedirect(event, '/')
    } catch(e) {
        return ''
    }
})