<template>
    <div class="week" ref="el" :style="{ height: elHeight + 'px' }">
        <OrbiterPerson v-for="person, idx of data.array" :key="idx" :person="person" class="week__day"
            :style="getPersonStyle(idx)" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useElementSize } from '@vueuse/core'

import OrbiterPerson from '@/components/OrbiterPerson/OrbiterPerson.vue'
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
const el = ref(null);
const { width } = useElementSize(el)

const elHeight = ref(0);


watch(width, (newValue) => {
    elHeight.value = newValue / 2;
})



const getPersonStyle = (index) => {
    const angle = (360 / props.data.array.length) * index;
    const radians = (angle * Math.PI) / 180;

    const x = elHeight.value + elHeight.value * Math.cos(radians);
    const y = elHeight.value + elHeight.value * Math.sin(radians);
    return {
        top: x + 'px',
        left: y + 'px'
    }
}
</script>

<style lang="scss" scoped>
.week {
    @apply border-t-2 border-l-2 border-r-2 absolute left-0 right-0;

    border-radius: 50vw 50vw 0 0;

    &__day {
        position: absolute;
        margin-left: -30px;
        margin-top: -30px;
    }
}
</style>