<script setup>
const { ingredients, add, nutritionInfo, getNutritionData, isLoading, deleteIngredient, findPortion } = useNutrition();

async function getData() {
    const { data } = await useFetch('/api/nutrition-info')
}


</script>

<template>
    <ul>
        <li v-for="ingredient in ingredients">

            <div class=" flex justify-content content-center mt-5">
                <input id="ingredient" v-model="ingredients[ingredients.indexOf(ingredient)].name"
                    class="border-b-2 border-black h-12 w-10/12" type="text">
                <input type="number" v-model="ingredients[ingredients.indexOf(ingredient)].portion"
                    class="text-center border border-black w-2/12 h-12 ">

                <select class="w-1/12 text-center border border-black" name="unit" id="unit">
                    <option value="grams">g</option>
                    <option value="lbs">lbs</option>

                </select>
                <button class="p-2 text-2xl" @click="deleteIngredient(ingredients.indexOf(ingredient))">X</button>

            </div>

            <div v-if="nutritionInfo" class="text-gray-500 italic">
                {{ findPortion(ingredient) }}
            </div>

        </li>
    </ul>


    <div class="mt-5">
        <button @click="add" class="btn bg-red-300">
            Add Ingredient
        </button>

        <button type="button" @click="getData" class="btn bg-red-300 inline">
            <span class="flex justify-content-center items-center">
                <svg v-if="isLoading" class="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-opacity-50"
                    style="border-right-color: white; border-top-color: white;" viewBox="0 0 24 24"></svg>
                <span class="ml-1">Submit</span>
            </span>



        </button>

    </div>
</template>



<style>
.btn {
    padding: 10px;
    border: black;
    border-radius: 20px;
    margin-right: 10px;
}
</style>