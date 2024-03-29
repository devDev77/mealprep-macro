
<script setup>
 
const {parseRecipe, recipe} = useNutrition()

</script>


<template>
    <div class=" ">
        <textarea name="" id="" rows="10" v-model="recipe" class="border border-black w-full p-3"></textarea>

        <button @click="parseRecipe" class='btn bg-red-300'>Convert</button>
    </div>
</template>

<style scoped>

</style>