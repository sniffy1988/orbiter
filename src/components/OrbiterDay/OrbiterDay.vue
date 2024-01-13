<template>
    <div>
        <h3 class="uppercase mb-5 mt-5">{{ data.contact_date }}</h3>
        <OrbiterPerson v-for="person, idx of data.array" :key="idx" :person="person" />
    </div>
</template>

<script setup>
import OrbiterPerson from '@/components/OrbiterPerson/OrbiterPerson.vue'
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped></style>