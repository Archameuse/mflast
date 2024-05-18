<template>
    <div class="w-full flex justify-center pt-4">
        <div class='grid w-full max-w-80 grid-cols-chartable border-collapse pb-8 -ml-4 justify-center'>
            <template v-for="(hero,index) in filledHeroes">
                <HeroPreview v-if="i18n.locale.value ==='en' && hero?.heroEN" :hero="hero.heroEN" :id="index+1" />
                <HeroPreview v-else-if="hero?.heroRU" :hero="hero.heroRU" :id="index+1"/>
                <HeroPreview v-else />
            </template>
        </div>
        <aside v-if="user?.admin" @click="addModal=true"  class="w-10 h-10 p-1 [outline:solid_1px_gray] cursor-pointer z-40 fixed right-4 bottom-4 rounded-sm shadow-md text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
        </aside>
        <AddModal v-if="addModal" @closeModal="addModal=false" @add="async () => {addModal=false;await refresh()}"/>
    </div>
</template>

<script setup lang="ts">
const {data:heroes, refresh} = useFetch<CharHolder[]>('/api/characters')
const {user} = useUser()
const screenSize = ref<number>(0)
const i18n = useI18n()
useHead({title: i18n.t('heroes')})
const addModal = ref<boolean>(false)
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

const filledHeroes = computed<(CharHolder|undefined)[]|undefined>(() => {
    if(!heroes.value) return undefined
    let arr:(CharHolder|undefined)[] = []
    if(screenSize.value > 336) arr=arrFiller<CharHolder>(heroes.value, 4)
    else if(screenSize.value > 256) arr=arrFiller<CharHolder>(heroes.value, 3)
    else if(screenSize.value > 176) arr=arrFiller<CharHolder>(heroes.value, 2)
    return arr
})
const lang = ref('ru')
</script>