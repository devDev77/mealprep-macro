<script setup>

import { collection } from 'firebase/firestore'
import { doc } from 'firebase/firestore'

const route = useRoute()
const id = route.params.id

const db = useFirestore()
const recipe = useDocument(doc(collection(db, 'recipes'), id))

</script>

<template>
    
    <h1 class="text-center text-3xl font-bold">{{ recipe.name }}</h1>


    <div class="block">
        <img :src="recipe.img" alt="">
    </div>
</template>

<style lang="scss" scoped></style>