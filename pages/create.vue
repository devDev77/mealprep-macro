
<script setup>

import { useNutrition } from '../composables/useNutrition'

const { ingredients, nutritionInfo, getNutritionData, findNutrient } = useNutrition()


console.log('in here')
</script>


<template>
    <h1 class="text-3xl">Create New Recipe</h1>


    <div class="w-full grid justify-content grid-rows-1 grid-cols-2">
        <div class="">
            <h3 class="text-2xl">Ingredients</h3>
            <ul>
                <li>
                    <input id="ingredient" v-model="ingredients[0]" class="border border-black h-12 w-10/12 my-2"
                        type="text">
                </li>
            </ul>

            <button @click="getNutritionData">
                Submit
            </button>

        </div>



        <div class="w-8/12 justify-self-end">

            <h3 class="text-3xl">Nutrition</h3>
            <div v-if="nutritionInfo">
                <div class="text-2xl mt-2 "> {{ findNutrient('energy') }} Calories </div>
                <div class="text-gray-700 px-auto mb-1 flex inline-flex margin-auto space-x-6 text-lg font-bold">

                    <div class=""> {{ findNutrient('protein') }} Protein</div>
                    <div class=""> {{ findNutrient('carb') }} Carbs</div>
                    <div class=""> {{ findNutrient('fat') }} Fat</div>
                </div>

                <div class=" mt-2 max-h-[475px] border border-black overflow-auto">
                    <ul class="p-2">
                        <li v-for="nutrient in nutritionInfo">
                            {{ nutrient.amount }}{{ nutrient.nutrient.unitName.toLowerCase() }} {{ nutrient.nutrient.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>../composables/useNutrition