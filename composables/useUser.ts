export default function() {
    const user = useState<User|null>('userState', () => null)
    const signIn = async () => {
        const config = useRuntimeConfig()
        await navigateTo(config.public.discordURL, {
            external: true
        })
    }
    const populateUser = async () => {
        const {data} = await useFetch<User>('/api/user')
        const refresh = await $fetch('/api/user/refresh', {method: 'POST'})
        if(!data) console.log('Error')
        user.value = data.value
        return data
    }
    const signOut = async () => {
        await $fetch('/api/user/signout', {method: 'POST'})
        await refreshUser()
    }
    const refreshUser = async () => {
        const data = await $fetch<User|null>('/api/user')
            .catch((e) => {console.error(e);return null})
        user.value = data
    }
    return {user, signIn, signOut, populateUser, refreshUser}
}