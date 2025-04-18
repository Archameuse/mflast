import jwt from 'jsonwebtoken'
import type {H3Event} from 'h3'
import type {JwtPayload} from 'jsonwebtoken'

export default defineEventHandler(event => {
    try {
        const cookie = getCookie(event, process.env.USER_COOKIE)
        if(!cookie) throw createError('Cookie not found')
        const token = jwt.verify(cookie, process.env.SECRET_KEY) as JwtPayload
        const {exp, iat, ...user} = token
        const sign = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })
        return setCookie(event, process.env.USER_COOKIE, sign)
    } catch(e) {
        return null
    }
})