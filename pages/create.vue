
<script setup>

import { ref } from 'vue';

const ingredients = ref(['ground beef', 'onion'])

const nutritionInfo = ref(null)

async function getNutritionInfo() {

    nutritionInfo.value = null

    for (const ingredient of ingredients.value) {
        console.log(ingredient)
        
        const { data } = await useFetch('/api/nutrition-info', {
            method: 'post',
            body: { ingredient: ingredient }
        })

        if (nutritionInfo.value) {

            console.log('HIASD')

            const newData = data.value

            console.log(newData)

            for (const nutrient of nutritionInfo.value) {

                let index = nutritionInfo.value.indexOf(nutrient)

                if (nutrient.nutrientId === newData.foodNutrients[index].nutrientId) {
                    nutrient.value += newData.foodNutrients[index].value
                }
            }

        } else {

            console.log('IN HERE')
            console.log(data.value)

            console.log(data.value.foodNutrients)
            nutritionInfo.value = data.value.foodNutrients
        

        }
        
    }
}




console.log('in here')
</script>


<template>
    <div>
        <h1 class="text-3xl">Create New Recipe</h1>

        <h3 class="text-2xl">Ingredients </h3>
        <div>

            <ul>
                <li>
                    <input id="ingredient" class="border border-black h-12 w-1/2 my-2" v-model="ingredients[0]" type="text">
                </li>
                <li>
                    <input id="ingredient" class="border border-black h-12 w-1/2 my-2" v-model="ingredients[1]" type="text">
                </li>
            </ul>

        </div>

        <!-- <textarea id="ingredients" v-model="ingredient" name="ingredients" rows="4" cols="50"></textarea> -->

        <button @click="getNutritionInfo">
            Submit
        </button>

        <div v-if="nutritionInfo">
            <ul>
                <li v-for="nutrient in nutritionInfo">
                    {{ nutrient.value }}{{ nutrient.unitName.toLowerCase() }} {{ nutrient.nutrientName }}
                </li>
            </ul>
        </div>

    </div>
</template>


<style lang="scss" scoped></style>