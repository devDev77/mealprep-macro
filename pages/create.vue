
<script setup>

import { ref } from 'vue';

const ingredients = ref(['ground beef', 'red onion'])

const nutritionInfo = ref(null)

const { data: nutrition } = await useAsyncData('nutrition', () => queryContent().find())

async function getNutritionInfo() {

    nutritionInfo.value = null
    let totalFoodNutrients = null

    for (const ingredient of ingredients.value) {

        let keyWords = ingredient.toLowerCase().match(/\w+/g)

        let results = nutrition.value[0].FoundationFoods.filter((array) => {

            return keyWords.every(word => array.description.toLowerCase().includes(word))

        })

        let nutrients = results[0].foodNutrients.filter(amt => amt.amount > 0.1)
        let foodPortion = results[0].foodPortion

        let index = 0

        if (!totalFoodNutrients) {
            totalFoodNutrients = nutrients
        } else {
            for (const nutrient of nutrients) {

                if (nutrient.nutrient.id === totalFoodNutrients[index].nutrient.id) {
                    nutrient.nutrient.amount += totalFoodNutrients[index].nutrient.amount
                }

                console.log(totalFoodNutrients[index].nutrient)

                index += 1
            }
        }


    }

    console.log(totalFoodNutrients)
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
                    {{ nutrient.amount }}{{ nutrient.nutrient.unitName.toLowerCase() }} {{ nutrient.nutrient.name }}
                </li>
            </ul>
        </div>

    </div>
</template>


<style lang="scss" scoped></style>