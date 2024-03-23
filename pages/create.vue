<script setup>

import { useNutrition } from '../composables/useNutrition'


const { nutritionInfo, isLoading, macros, getNutritionData, add, foodPortion, reset, bulkImport } = useNutrition()

const showNutrition = ref(true)



const CreateBulkImport = resolveComponent('CreateBulkImport')
const CreateManual = resolveComponent('CreateManual')

onMounted(() => {
    reset()
})

</script>


<template>
    <h1 class="text-3xl">Create New Recipe</h1>


    <div class="w-10/12 flex justify-between">
        <div class="w-5/12">
            <h3 class="text-2xl">Ingredients</h3>
            <CreateTabs @switchInputs="(val) => bulkImport = val" :bulkImport="bulkImport" :key="bulkImport" />
            
            <component :is="bulkImport ? CreateBulkImport : CreateManual" />

        </div>



        <div class="w-6/12">
            <h3 class="text-3xl">Nutrition</h3>

            
            <div v-if="isLoading" class="">
                <p class="2xl">Loading...</p>
            </div>

            <div v-if="nutritionInfo" class="grid justify-start justify-items-center">


                <div>
                    <div class="text-2xl mt-2 text-center font-bold "> {{ macros.calories }} Calories </div>
                    <div class="text-gray-700 px-auto mb-1 flex inline-flex margin-auto space-x-6 text-lg font-bold ">

                        <div class="text-protein-color"> {{ macros.protein }}g Protein</div>
                        <div class="text-carbo-color"> {{ macros.carbo }}g Carbs</div>
                        <div class="text-fat-color"> {{ macros.fat }}g Fat</div>
                    </div>
                </div>


                <!-- <doughnutChart v-if="!showNutrition" class="my-8 w-[400px] " :macros="macros"  /> -->

                <div class="w-[400px] my-3 h-[400px] border-y-2 border-black overflow-auto">
                    <ul class="p-2 pl-3">
                        <li v-for="nutrient in nutritionInfo">
                            {{ nutrient.amount }}{{ nutrient.nutrient.unitName.toLowerCase() }} {{
                    nutrient.nutrient.name }}
                        </li>
                    </ul>
                </div>

                <button @click="toggleNutrition" class='btn bg-orange-300 w-fit '>{{ showNutrition ? 'Hide Nutrition Facts' :
                    'Show Nutrition Facts' }}</button>
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