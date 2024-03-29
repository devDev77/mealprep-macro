<script setup>
const { ingredients, add, nutritionInfo, getNutritionData, isLoading, deleteIngredient, findPortion, measurementKey } = useNutrition();

// function getSelected() {
//     ingredients[ingredients.indexOf(ingredient)]
// }
</script>

<template>
    <ul>
        <li v-for="ingredient in ingredients">

            <div class=" flex justify-content content-center mt-5 ">
                <input id="ingredient" v-model="ingredients[ingredients.indexOf(ingredient)].name"
                    class="border-b-2 border-black h-12 w-10/12" type="text">
                <input type="number" v-model="ingredients[ingredients.indexOf(ingredient)].portion"
                    class="text-center border border-black w-2/12 h-12 ">

                <select @click="console.log(ingredients[ingredients.indexOf(ingredient)].measurement)" class="w-2/12 text-center border border-black" v-model="ingredients[ingredients.indexOf(ingredient)].measurement" name="unit" id="unit">
                    <option disabled value="">Please select one</option>
                    <option v-for="keyWord in measurementKey" :value="keyWord" >{{ keyWord }}</option>
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

        <button type="button" @click="getNutritionData" class="btn bg-red-300 inline">
            <span class="flex justify-content-center items-center">
                <!-- <svg v-if="isLoading" class="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-opacity-50"
                    style="border-right-color: white; border-top-color: white;" viewBox="0 0 24 24"></svg> -->
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