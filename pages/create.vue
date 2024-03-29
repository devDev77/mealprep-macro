<script setup>

import { useNutrition } from '../composables/useNutrition'


const { nutritionInfo, isLoading, macros, getNutritionData, add, foodPortion, reset, bulkImport } = useNutrition()

const showNutrition = ref(true)

const CreateBulkImport = resolveComponent('CreateBulkImport')
const CreateManual = resolveComponent('CreateManual')

onMounted(() => {
    reset()
})

watch(isLoading, () => {
    console.log(isLoading)
})

</script>


<template>
    <h1 class="text-3xl mt-16">Create New Recipe</h1>


    <div class="grid gap-x-60 mt-3 mt-[3%] grid-cols-2 justify-between">
        <div class="">
            <h3 class="text-3xl ">Ingredients</h3>
            <CreateTabs @switchInputs="(val) => bulkImport = val" :bulkImport="bulkImport" :key="bulkImport" />

            <component :is="bulkImport ? CreateBulkImport : CreateManual" />

        </div>



        <div class="">

            <h3 class="text-3xl mt-3 w-full text-center">Nutrition Info</h3>




            <div v-if="!nutritionInfo" class="h-56 mt-4 flex justify-center items-center border-y-2 border-black">
                <h1 v-if="!isLoading" class="text-center text-2xl font-semibold">Submit ingredients to get nutrition
                    info!</h1>
                <div v-if="isLoading" class="text-center grid justify-items-center">
                    <div class='flex space-x-2 justify-center items-center'>
                        <span class='sr-only'>Loading...</span>
                        <div class='h-4 w-4 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div class='h-4 w-4 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div class='h-4 w-4 bg-gray-600 rounded-full animate-bounce'></div>
                    </div>
                </div>
            </div>

            <div v-if="nutritionInfo && !isLoading" class="">



                <div class="text-center">
                    <div class="text-2xl mt-2 text-center font-bold "> {{ macros.calories }} Calories </div>
                    <div class="text-gray-700 px-auto mb-1 flex inline-flex  space-x-6 text-lg font-bold ">

                        <div class="text-protein-color"> {{ macros.protein }}g Protein</div>
                        <div class="text-carbo-color"> {{ macros.carbo }}g Carbs</div>
                        <div class="text-fat-color"> {{ macros.fat }}g Fat</div>
                    </div>
                </div>


                <!-- <doughnutChart v-if="!showNutrition" class="my-8 w-[400px] " :macros="macros"  /> -->

                <div class="my-3 max-h-[50svh] border-y-2 border-black overflow-auto">
                    <ul class="p-2 pl-3">
                        <li v-for="nutrient in nutritionInfo">
                            {{ nutrient.amount }}{{ nutrient.nutrient.unitName.toLowerCase() }} {{
                nutrient.nutrient.name }}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>


</template>


<style scoped>
.btn {
    padding: 10px;
    border: black;
    border-radius: 20px;
    margin-right: 10px;
}
</style>