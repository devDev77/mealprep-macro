

<script setup>

const router = useRouter()

const recipe = defineProps(['id', 'name', 'img', 'calories', 'protein', 'carbs', 'fat'])

</script>

<template>
    <div class="w-[95%] rounded overflow-hidden mb-10 hover:underline hover:text-orange-500" @click="router.push({ path: recipe.id })">
        <img class="w-full h-64"
            :src="recipe.img"
            alt="">
        <div class="px-6 py-4 text-center ">
            <div class="text-gray-700 px-auto mb-1 flex inline-flex margin-auto space-x-6 text-lg font-bold">
                <div class="">{{ recipe.calories }} Cal</div>
                <div class="">{{ recipe.protein }} P</div>
                <div class="">{{ recipe.carbs }} C</div>
                <div class="">{{ recipe.fat }} F</div>
            </div>

            <div class="font-bold text-2xl mb-2">{{ recipe.name }}</div>

        </div>
        <div class="px-6 pb-2 text-center">
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>