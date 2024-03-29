<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement)

const { macros } = defineProps(['macros'])

const data = ref(
    {
        datasets: [
            {
                backgroundColor: ['#f79797', '#9eaeff', '#f1a1ff'],
                data: [macros.protein, macros.carbo, macros.fat],
                cutout: '90%',
            },
        ],

    },
)

const macrosTotal = computed(() => {
    return macros.protein + macros.carbo + macros.fat
})

const options = ref({
    responsive: true,
    maintainAspectRatio: false,
});


</script>

<template>
    <div class="relative">
        <div class="absolute inset-0 mx-auto my-auto w-fit h-fit grid justify-center content-center text-center">
            <div class="text-2xl text-center font-bold">{{ macros.calories }} Calories </div>
            <div class="text-gray-700 px-auto mb-1 text-lg font-bold ">

                <div class="my-1 text-protein-color">{{ macros.protein }}g Protein ({{ Math.round((macros.protein / macrosTotal) * 100) }}%)</div>
                <div class="my-1 text-carbo-color">{{ macros.carbo }}g Carbs ({{ Math.round((macros.carbo / macrosTotal) * 100) }}%)</div>
                <div class="my-1 text-fat-color">{{ macros.fat }}g Fat ({{ Math.round((macros.fat / macrosTotal) * 100) }}%)</div>
            </div>
        </div>
        <Doughnut :data="data" :options="options" class="w-fit h-fit " />
    </div>
</template>


<style lang="scss" scoped></style>