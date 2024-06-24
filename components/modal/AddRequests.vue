<template>

    
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:isOpen', 'submit'])

const closeModal = () => {
    emits('update:isOpen', false);
}
</script>