<template>
    <div class="select-none">
        <h1 class="text-xl font-medium text-gray-900">{{$t('abilitychar')}} {{index}}</h1>
        <div class="flex flex-col gap-5 pt-2">
            <div>
                <label class="text-sm font-medium text-gray-900">{{$t('abilityhotkeychar')}} - </label>
                <select :value="getHotkey">
                    <option v-for="hotkey of hotkeys" :key="(hotkey + index)">{{hotkey}}</option>
                </select>
            </div>
            <InputText :value="ability?.name" :tag="`ability-name-${index}`" :text="$t('abilitynamechar')"/>
            <InputArea :value="ability?.description" :tag="`ability-description-${index}`" :text="$t('abilitydescrchar')"/>
            <InputNumber :value="ability?.cd" :tag="`ability-cd-${index}`" :text="$t('abilitycdchar')"/>
            <div class="flex items-center mb-4">
                <input :checked="ability?.passive" type="checkbox" :id="`ability-ispassive-${index}`" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500">
                <label :for="`ability-ispassive-${index}`" class="ml-2 text-sm font-medium text-gray-900">{{$t('abilitypassivechar')}}</label>
            </div>
            <InputText :value="ability?.image" :tag="`ability-image-${index}`" :text="$t('abilityimagechar')" placeholder='https://i.imgur.com/bJUoGF0.png'/>
            <InputText :value="ability?.video" :tag="`ability-video-${index}`" :text="$t('abilityvideochar')" placeholder='https://i.imgur.com/bJUoGF0.png'/>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    index: {
        type:Number,
        required: true
    },
    ability: Object as PropType<Ability>
})
const hotkeys = ['Q', 'W', 'R', 'T']
const getHotkey = computed(() => {
    return hotkeys[props.index-1]
})
</script>