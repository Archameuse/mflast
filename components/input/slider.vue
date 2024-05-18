<template>
    <div class="flex flex-col w-full">
        <label v-if="text&&tag" :for="tag" class="block mb-2 text-sm font-medium text-gray-900 w-fit">
            {{`${text} - ${val}`}}
        </label>
        <input type="range" :id="tag" step="1" max="5" min="1" :value="val" @input="setValue">
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    tag: String,
    text: String,
    value: Number,
    placeholder: String
})
const val = toRef(props.value||3)
const setValue = (e:Event) => {
    const target = e.target as HTMLInputElement
    if(!target) return
    val.value = Number.parseInt(target.value)
}
</script>