<script setup>

const {bulkImport} = defineProps(['bulkImport'])

</script>

<template>
    <div>
        <ul class="flex justify-stretch mt-3 text-md font-medium text-center text-black border-b-4 border-black">
            <li class="me-4">
                <button @click="$emit('switchInputs', true)"
                    class="inline-block border-x-2  border-t-2 border-black p-2 rounded-t-lg" :class="{'active': bulkImport}">Bulk
                    Import</button>
            </li>
            <li class="me-4">
                <button @click="$emit('switchInputs', false)" aria-current="page"
                    class="inline-block border-x-2 border-t-2 border-black p-2 rounded-t-lg " :class="{'active': !bulkImport}">Manual</button>
            </li>

        </ul>

    </div>
</template>

<style scoped>
.active {
    background-color: rgb(243 244 246);
}
</style>