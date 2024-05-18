import type {H3Event} from 'h3'
import jwt from 'jsonwebtoken'


export default (event:H3Event) => {
    try {
        const cookie = getCookie(event, process.env.USER_COOKIE)
        if(!cookie) throw createError('Cookie not found')
        const user = jwt.verify(cookie, process.env.SECRET_KEY)
        return user as User
    } catch (e) {
        if(e instanceof jwt.JsonWebTokenError) {
            deleteCookie(event, 'user-cookie', {
                httpOnly: true
            })
        }
        return null
    }
}