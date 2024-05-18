<template>
    <ModalMain @close-modal="$emit('close-modal')" :headline="`${$t('delchar')} - ${characterName}`">
        <div class="flex justify-between mt-10 px-10">
            <button type="button" @click="$emit('close-modal')" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{{ $t('cancelbutton') }}</button>
            <button type="button" @click="delChar" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{{ $t('delbutton') }}</button>
        </div>
    </ModalMain>
</template>

<script setup lang="ts">
const props = defineProps({
    characterName: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})
const {execute, error} = useFetch('/api/character',{
    method: 'DELETE',
    immediate: false,
    watch: false,
    query: {
        id:props.id,
    }
})
const delChar = async () => {
    await execute()
    if(error.value) return alert('Error: '+error.value.status)
    await navigateTo('/heroes')
}
</script>