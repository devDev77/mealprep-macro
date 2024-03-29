<script setup>

import { collection } from 'firebase/firestore'
import { doc } from 'firebase/firestore'

const route = useRoute()
const id = route.params.id

const db = useFirestore()
const recipe = useDocument(doc(collection(db, 'recipes'), id))

</script>

<template>
    <div class="ml-16 w-[50%]">
        <h1 class="text-3xl text-center font-bold mt-12">{{ recipe.name }}</h1>

        <div class="text-gray-700 w-full justify-center px-auto mt-2 mb-3 flex margin-auto space-x-6 text-lg font-bold">
            <div class="">{{ recipe.calories }} Calories</div>
            <div class="">{{ recipe.protein }}g Protein</div>
            <div class="">{{ recipe.carbs }}g Carbs</div>
            <div class="">{{ recipe.fat }}g Fat</div>
        </div>


        <div class="block">
            <img :src="recipe.img" class="w-[650px]" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped></style>