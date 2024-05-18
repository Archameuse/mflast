<template>
    <ModalMain @close-modal="$emit('close-modal')" :headline="$t('addchar')">
        <form class="flex flex-col p-4 gap-6 overflow-y-scroll max-h-[calc(200vh/3)]" @submit.prevent="submit">
            <InputText :text="$t('namechar')" tag="name" :placeholder="$t('namecharexample')"/>
            <InputText :text="$t('iconchar')" tag="icon" placeholder="https://i.imgur.com/bJUoGF0.png"/>
            <InputSlider :text="$t('difficultychar')" tag="difficulty" />
            <InputText :text="$t('imagechar')" tag="image" placeholder="https://i.imgur.com/bJUoGF0.png"/>
            <div class="flex flex-col">
                <h2 class="text-md font-medium text-gray-900">{{$t('addtalents')}}</h2>
                <InputText tag='talent-1' :placeholder="$t('addtalent1')"/>
                <InputText tag='talent-2' :placeholder="$t('addtalent2')"/>
            </div>
            <InputArea :text="$t('descrchar')" tag="description" />
            <InputAbilities v-for="index in abilityAmount" :index="index"/>
            <div class="flex justify-center">
                <button v-if="(abilityAmount > 1)" @click="abilityAmount=Math.max(abilityAmount-1,1)" type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">x</button>
                <button v-if="(abilityAmount < 4)" @click="abilityAmount=Math.min(abilityAmount+1,4)" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">+</button>
            </div>
            <div class="flex justify-between">
                <button type="button" @click="$emit('close-modal')" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{{$t('cancelbutton')}}</button>
                <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{{$t('addbutton')}}</button>
            </div> 
        </form>
    </ModalMain>
</template>

<script setup lang="ts">
const abilityAmount = ref<number>(2)
const character = ref<Character>()
const emit = defineEmits(['close-modal','add'])
const {execute, error} = useFetch('/api/characters', {
    method: 'POST',
    immediate: false,
    watch: false,
    body: {character}
})
const submit = async (e:Event) => {
    if(!(e instanceof SubmitEvent)) return
    const inputsArray:HTMLInputElement[] = []
    for(const input of e.target as HTMLFormElement) {
        if(input.nodeName !== 'BUTTON') {
            inputsArray.push(input as HTMLInputElement)
        }
    }
    const name = inputsArray.shift()?.value
    const preview = inputsArray.shift()?.value
    const difficulty = inputsArray.shift()?.valueAsNumber
    const image = inputsArray.shift()?.value
    const talents = [
        inputsArray.shift()?.value||'',
        inputsArray.shift()?.value||''
    ]
    const description = inputsArray.shift()?.value
    const abilities:Ability[] = []
    const abilityInputs:HTMLInputElement[][] = arrSplitter(inputsArray.length/abilityAmount.value, inputsArray)
    abilityInputs.map(item => {
        const hotkey = item.shift()?.value
        const name = item.shift()?.value
        const description = item.shift()?.value
        const cd = item.shift()?.valueAsNumber
        const passive = item.shift()?.checked
        const image = item.shift()?.value
        const video = item.shift()?.value
        if(!hotkey||!name||!description||!image||!video||cd === undefined||passive === undefined) return
        abilities.push({
            hotkey,
            name,
            description,
            cd,
            passive,
            image,
            video
        })
    })
    if(!description||!image||!name||!preview||!talents[0]||!talents[1]||difficulty === undefined||abilities.length !== abilityAmount.value) return alert('Не все поля были заполнены')
    character.value = {
        abilities,
        description,
        difficulty,
        image,
        name,
        preview,
        talents
    }
    await execute()
    if(error.value) return alert('Error '+error.value.statusCode)
    emit('add')
}

</script>