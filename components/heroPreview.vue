<template>
    <div class="select-none group relative w-24 h-24 border-spacing-0 bg-black border-solid border-8 z-10 [border-image:url(public/orb-borders.png)_40] -mb-4 p-0 scale-90">
        <div v-if="hero?.preview" class="peer scale-100 w-full h-full active:opacity-80 active:scale-95">
            <NuxtLink draggable="false" :to="id ? `/heroes/${id}` : '/heroes'">
                <img draggable="false" :src="hero.preview" :alt="hero.name" class="object-cover h-full w-full object-center" preload>
            </NuxtLink>
        </div>
        <div v-if="hero?.name" class="transition-opacity absolute px-2 py-1 pointer-events-none top-0 left-1/2 -translate-y-[120%] -translate-x-1/2 opacity-0 rounded bg-black text-white hover peer-hover:opacity-100">{{hero.name}}</div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    hero: Object as PropType<Character>,
    id: Number,
})
</script>