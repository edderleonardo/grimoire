<template>
    <div class="mt-5 container mx-auto">
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">Solicitudes</h1>
                    <p class="mt-2 text-sm text-gray-700">Lista de solicitudes para recibir un grimorio</p>
                </div>
            </div>
            <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <ListGrimorios />
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style lang="sass" scoped>
input[type="text"],
select
  height: 40px
</style>