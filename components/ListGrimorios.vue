<template>
    <div class="flex justify-end mb-5">
        <button type="button" @click="openModal"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Agregar Solicitud
        </button>
    </div>
    <table class="min-w-full divide-y divide-gray-300">
        <thead>
            <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Nombre</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Apellidos</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Afinidad</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Grimorio</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="">Acciones</span>
                </th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr v-for="request in requests" :key="request.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {{ request.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ request.last_name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ request.affinity }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm"
                    :class="{ 'text-red-500 font-black': request.status === 'Rechazado' }">
                    {{ request.status }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ request.grimorio ? request.grimorio : 'No asignado' }}
                </td>

                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                    <a href="#" @click.prevent="editRequest(request)"
                        class="text-indigo-600 hover:text-indigo-900">Editar</a> |
                    <span @click="deleteR(request.id)" class="text-red-600 hover:text-red-900 pointer">Borrar</span>
                </td>
            </tr>
        </tbody>
    </table>

    <div v-if="isModalOpen" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div class="">
                    <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            {{ isEditMode ? 'Editar Solicitud' : 'Agregar Solicitud' }}
                        </h3>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">Aquí puedes {{ isEditMode ? 'editar' : 'agregar' }} los
                                detalles de tu solicitud.</p>
                            <br>
                            <!-- Formulario para agregar solicitud -->
                            <form @submit.prevent="handleSubmit" class="mt-5">
                                <div class="mt-4">
                                    <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input type="text" id="name" v-model="name" required
                                        class="block w-full border-gray-300 rounded-md shadow-sm">
                                </div>
                                <div class="mt-4">
                                    <label for="lastname"
                                        class="block text-sm font-medium text-gray-700">Apellidos</label>
                                    <input type="text" id="lastname" v-model="lastname" required
                                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                </div>
                                <div class="mt-4">
                                    <label for="id"
                                        class="block text-sm font-medium text-gray-700">Identification</label>
                                    <input type="text" id="id" v-model="id" required
                                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                </div>
                                <div class="mt-4">
                                    <label for="age" class="block text-sm font-medium text-gray-700">Edad</label>
                                    <input type="text" id="age" v-model="age" required
                                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                </div>
                                <div class="mt-4">
                                    <label for="role" class="block text-sm font-medium text-gray-700">Afinidad</label>
                                    <select id="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        v-model="role" required>
                                        <option value="Oscuridad">Oscuridad</option>
                                        <option value="Luz">Luz</option>
                                        <option value="Fuego">Fuego</option>
                                        <option value="Agua">Agua</option>
                                        <option value="Viento">Viento</option>
                                        <option value="Tierra">Tierra</option>
                                    </select>
                                </div>
                                <div class="mt-5 sm:mt-6">
                                    <button type="submit"
                                        class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                        {{ isEditMode ? 'Guardar Cambios' : 'Agregar' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <button type="button"
                        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        @click="closeModal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { userGrimoire } from '../store/index'
import { storeToRefs } from 'pinia'


const store = userGrimoire()
const { requests } = storeToRefs(store)

const name = ref('')
const lastname = ref('')
const id = ref('')
const age = ref('')
const role = ref('')

const isModalOpen = ref(false);
const isEditMode = ref(false);
const currentRequest = ref(null);

const openModal = () => {
    isModalOpen.value = true;
    isEditMode.value = false;
    resetForm();
};

const closeModal = () => {
    isModalOpen.value = false;
    resetForm()
}

const resetForm = () => {
    name.value = ''
    lastname.value = ''
    id.value = ''
    age.value = ''
    role.value = ''
    currentRequest.value = null;
}

const handleSubmit = () => {
    if (isEditMode.value) {
        updateRequest()
    } else {
        createRequest()
    }
    closeModal()
    resetForm()
}

const createRequest = () => {
    store.createRequest({
        name: name.value,
        last_name: lastname.value,
        identification: id.value,
        age: age.value,
        affinity: role.value
    })
}

const editRequest = (request) => {
    currentRequest.value = request;
    name.value = request.name;
    lastname.value = request.last_name;
    id.value = request.identification;
    age.value = request.age;
    role.value = request.affinity;

    isEditMode.value = true;
    isModalOpen.value = true;
}

const updateRequest = () => {
    store.updateRequest(currentRequest.value.id, {
        name: name.value,
        last_name: lastname.value,
        identification: id.value,
        age: age.value,
        affinity: role.value
    })
}

const deleteR = (id) => {
    // confirm modal
    store.deleteRequest(id)
}

onMounted(() => {
    store.fetchRequest()
})

</script>

<style lang="sass" scoped>
input[type="text"],
select
  height: 40px
</style>