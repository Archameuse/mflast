<template>
    <div @click="reversed=!reversed" :class="reversed&&'[transform:rotateY(180deg)]'" class="w-60 h-80 transition-all duration-500 bg-gray-500 rounded-md bg-cover bg-center [background-image:url(public/playercard.png)] border-solid border-white border-4 [outline:solid_1px_rgb(0,0,0,0.15)] font-kelly-slab font-thin m-0 p-0 text-center cursor-pointer select-none text-nowrap">
        <div class="flex flex-col transition-all duration-500" :class="reversed&&'-scale-x-100'">
            <div class="h-12 flex flex-col justify-center items-center">
                <h1 class="text-3xl">{{player.season}}</h1>
            </div>
            <div class="text-white [text-shadow:0_0_5px_black,0_0_2px_rgba(0,0,0,0.6)] h-20 flex flex-col justify-center">
                <h1 class="text-3xl">{{ player.name }}</h1>
            </div>
            <div class="text-white [text-shadow:0_0_3px_black] text-left flex flex-col justify-end h-32 pl-[min(3rem,calc(40%-3rem))]">
                <h3 class="text-sm">{{$t('wins')}}: {{player.wins}}</h3>
                <h3 class="text-sm">{{$t('lossess')}}: {{player.losses}}</h3>
                <h3 class="text-sm">{{$t('draws')}}: {{player.draws}}</h3>
            </div>
            <div>
                <h2 class="uppercase underline text-xl">
                    {{delayedReversed ? `PTS: ${player.pts}` : `Ранг: ${player.rank}`}}
                </h2>
                <h2 class="text-xl">
                    {{delayedReversed ? `Winrate: ${player.winrate}%` : `Club: ${player.club}`}}
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    player: {
        type: Object as PropType<Player>,
        required: true
    }
})
const delayedReversed = useDebouncedRef(false, 200, false)
const reversed = ref<boolean>(false)
watch(reversed, (newVal) => {
    delayedReversed.value = newVal
})
</script>