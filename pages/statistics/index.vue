<template>
    <main class="w-full p-4 max-w-screen-xl m-auto justify-center flex flex-wrap gap-4">
        <PlayerCard v-for="player of players" :player="player"/>
    </main>
</template>

<script setup lang="ts">
const i18n = useI18n()
useHead({title: i18n.t('statistics')})
const { data: players } = await useFetch<Player[]>('/api/players')
</script>