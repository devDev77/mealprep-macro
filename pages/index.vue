<script setup>

import { collection } from 'firebase/firestore'

const db = useFirestore()

const recipes = useCollection(collection(db, 'recipes'))

</script>

<template>
  <section>

    <h1 class="text-4xl m-3">Recommended Recipes</h1>

    <div class="grid grid-cols-3 gap-x-9 justify-items-center">

      <RecipeThumbnail 
        v-for="recipe in recipes" 
        :name="recipe.name"
        :img="recipe.img"
        :calories = "recipe.calories"
        :protein="recipe.protein"
        :carbs="recipe.carbs"
        :fat="recipe.fat"
        :id="recipe.id" 
      />

      

    </div>


  </section>
</template>

<style lang="scss" scoped></style>
