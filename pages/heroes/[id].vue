<template>
    <article v-if="hero&&computedHero" class="font-cuprum">
        <div class="relative w-full aspect-video min-h-[calc(200vh/3)] bg-zinc-800">
            <img preload draggable='false' :src="computedHero.image" :alt="computedHero.name" class='h-full w-full object-center object-cover select-none absolute top-0 left-0' />
            <div class="flex relative z-10 text-white w-full justify-center text-center items-center py-10 px-8 bg-zinc-800">
                <h1 class="text-2xl sm:text-5xl">{{ computedHero.name }}</h1>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-screen-md flex justify-end px-[min(4rem,calc(25%)-1rem)] pt-4">
                    <div class="flex sm:scale-[200%]">
                        <NuxtLink v-if="hero.prev" :to="`/heroes/${Number($route.params.id)-1}`">
                            <IconBack/>
                        </NuxtLink>
                        <NuxtLink to="/heroes">
                            <IconGrid />
                        </NuxtLink>
                        <NuxtLink v-if="hero.next" :to="`/heroes/${Number($route.params.id)+1}`">
                            <IconForward class="h-full"/>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <main class="flex flex-col items-center text-center pb-10 max-w-screen-lg bg-[whitesmoke] drop-shadow-md px-4 m-auto">
            <div class="text-xl sm:text-2xl border-b-2 border-black pb-2 w-full max-w-[60ch] mt-5">
                <p>{{computedHero.description}}</p>
            </div>
            <div class="w-full aspect-video min-h-80 max-w-[140c] mt-5 relative group" >
                <template v-for="(ability,index) of computedHero.abilities">
                    <video  :class="index!==currentAbility && 'hidden'" :src="ability.video" autoplay muted preload="auto" loop class="w-full h-full object-cover absolute top-0 left-0"></video>
                    <div class="w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity ease-out absolute top-0 left-0 text-white overflow-y-scroll hidescrollbar" :class="index!==currentAbility && 'hidden'">
                        <h2 class="text-xl sm:text-3xl mt-2.5">
                            {{`${ability.name} (${ability.hotkey})`}}
                        </h2>
                        <p class="mt-2.5 p-5 text-base sm:text-xl">
                            {{ability.description}}
                            <br/>
                            {{!!ability.cd ? `${$t('cd')} - ${ability.cd} ${$t('seconds')}` : ''}}
                        </p>
                    </div>
                </template>
            </div>
            <div class="mt-0 relative w-full min-w-fit -top-10 justify-center flex flex-wrap">
                <div v-for="(ability, index) in arrFiller<Ability>(computedHero.abilities, (screenSize>383||screenSize<296)?4:3)" :key="index" class="select-none relative bg-black w-24 h-24  border-solid border-4 [border-image:url(public/orb-borders.png)_40] -ml-2">
                    <div v-if="ability?.image" @click="currentAbility = index" class="scale-95 peer w-full h-full active:opacity-80 active:scale-90">
                        <img preload  :src="ability.image" draggable="false" class="object-cover w-full h-full object-center cursor-pointer"/>
                    </div>
                    <div v-if="ability?.name" class="absolute min-w-fit text-nowrap top-0 left-1/2 -translate-x-1/2 -translate-y-[120%] bg-black text-white rounded-md px-4 py-2 opacity-0 pointer-events-none peer-hover:opacity-100 transition-opacity ease-out z-10">[{{ ability.hotkey }}] {{ability.name}}</div>
                </div>
            </div>
            <div class="w-full relative mt-5 max-w-[140ch] text-xl sm:text-3xl text-center flex flex-col gap-14">
                <div v-if="computedHero.talents[0]">
                    <b>{{ $t('talent') }}</b> <br/>
                    {{computedHero.talents[0]}}
                </div>
                <div v-if="computedHero.talents[1]">
                    <b>{{ $t('talent') }}</b> <br/>
                    {{computedHero.talents[1]}}
                </div>
            </div>
        </main>
        <aside v-if="user?.admin" @click="editModal=true" class="w-10 h-10 p-1 [outline:solid_1px_gray] cursor-pointer z-40 fixed left-4 bottom-4 rounded-sm shadow-md text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                <path d="M16 5l3 3"/>
            </svg>
        </aside>
        <aside v-if="user?.admin" @click="translateModal=true" class="w-10 h-10 p-1 [outline:solid_1px_gray] cursor-pointer z-40 fixed left-16 bottom-4 rounded-sm shadow-md text-blue-600">
            <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m11.9 22l4.55-12h2.1l4.55 12H21l-1.075-3.05h-4.85L14 22zM4 19l-1.4-1.4l5.05-5.05q-.875-.875-1.588-2T4.75 8h2.1q.5.975 1 1.7t1.2 1.45q.825-.825 1.713-2.313T12.1 6H1V4h7V2h2v2h7v2h-2.9q-.525 1.8-1.575 3.7t-2.075 2.9l2.4 2.45l-.75 2.05l-3.05-3.125zm11.7-1.8h3.6l-1.8-5.1z"/></svg>
        </aside>
        <aside v-if="user?.admin" @click="deleteModal=true" class="w-10 h-10 p-1 [outline:solid_1px_gray] cursor-pointer z-40 fixed right-4 bottom-4 rounded-sm shadow-md text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </aside> 
        <DeleteModal v-if="deleteModal" :id="hero.id" :character-name="computedHero.name" @close-modal="deleteModal=false"/>
        <EditModal v-if="editModal" @close-modal="editModal=false" :character="hero.heroRU" :id="hero.id" @edit="async () => {editModal=false;await refresh()}"/>
        <TranslateModal v-if="translateModal" @close-modal="translateModal=false" :character="hero.heroEN" :id="hero.id" @edit="async () => {translateModal=false;await refresh()}"/>
    </article>
</template>

<script setup lang="ts">
definePageMeta({
    validate: async (route) => {
        return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
    }
})
const {user} = useUser()
const deleteModal = ref<boolean>(false)
const editModal = ref<boolean>(false)
const translateModal = ref<boolean>(false)
const screenSize = ref<number>(0)
const onResize = () => {
    screenSize.value = window.innerWidth
}

onMounted(() => {
    screenSize.value = window.innerWidth
    window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
})
const currentAbility = ref(0)
const route = useRoute()
const i18n = useI18n()
const {data:hero,refresh} = await useFetch<CharHolder>('/api/character', {query: {id: route.params.id,lang:'ru'}})
const computedHero = computed<Character|undefined>(() => {
    return (i18n.locale.value==='en'&&hero.value?.heroEN)?hero.value?.heroEN : hero.value?.heroRU
})
useHead({title: computedHero.value?.name})
// const error = useError()
// const router = useRouter()
// NuxtError
</script>

<style>
.hidescrollbar::-webkit-scrollbar {
    display: none;
}

.hidescrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>