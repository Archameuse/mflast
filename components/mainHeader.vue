<template>
    <nav :class="!isHome&&'bg-gradient-to-b from-[#98ce9f] to-[#97be84]'" class="flex justify-center w-full text-white text-xl relative z-10 font-cuprum select-none">
        <div class="flex flex-wrap min-h-16 w-full max-w-screen-lg justify-between items-center p-2">
            <ul class="flex gap-4 items-center flex-grow-[99999]">
                <li class="aspect-square h-12 drop-shadow-md">
                    <NuxtLink to="/"><img class="drop-shadow-md" src="public/mflogosquare.png"></NuxtLink>
                </li>
                <li :class="route.fullPath==='/heroes'&&'underline'" class="uppercase underline-offset-4">
                    <NuxtLink to="/heroes">{{ $t('heroes') }}</NuxtLink>
                </li>
                <li :class="route.fullPath==='/statistics'&&'underline'" class="uppercase underline-offset-4">
                    <NuxtLink to="/statistics">{{ $t('statistics') }}</NuxtLink>
                </li>
            </ul>
            <ul class="flex gap-4 items-center justify-center flex-grow">
                <li @click="i18n.setLocale(i18n.locale.value==='en' ? 'ru' : 'en')" class="uppercase cursor-pointer">{{ i18n.locale.value==='en' ? 'RU' : 'EN' }}</li>
                <li v-if="user" :class="user.admin&&'text-blue-200'">{{ user.username }}</li>
                <li v-if="user" @click="signOut" class="uppercase cursor-pointer">{{ $t('logout') }}</li>
                <li v-else @click="signIn" class="uppercase cursor-pointer">{{ $t('login') }}</li>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
    const route = useRoute()
    const i18n = useI18n()
    const isHome = computed(() => {
        return route.fullPath==='/'
    })
    const {user, signIn, signOut} = useUser()
</script>