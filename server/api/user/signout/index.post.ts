export default defineEventHandler(event => {
    deleteCookie(event, process.env.USER_COOKIE, {
        httpOnly: true
    })
    return 'success'
})