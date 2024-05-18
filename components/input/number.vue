<template>
    <div class="flex flex-col w-full">
        <label v-if="text&&tag" :for="tag" class="block mb-2 text-sm font-medium text-gray-900 w-fit">
            {{ text }}
        </label>
        <input :value="value||'0'" type="number" :id="tag" step="1" min="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5">
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    tag: String,
    text: String,
    value: Number,
    placeholder: String
})
</script>