<script setup>
import { useOrbiterStore } from '@/stores/counter';
import OrbiterDay from '@/components/OrbiterDay/OrbiterDay.vue'
import MainSearch from '@/components/MainSearch/MainSearch.vue'
import { computed, ref, watch } from 'vue';

const store = useOrbiterStore();
const itemRefs = ref([])
const startDate = computed(() => {
  return store.startDate
})
const weekData = computed(() => {
  return store.weekData;
})


watch(startDate, () => {
  store.receiveWeek();
})

const getOrbitStyle = (index) => {
  const offset = 80;
  return {
    left: index * offset + 'px',
    right: index * offset + 'px',
  }
}

</script>

<template>
  <div class="main">
    <div class="week-holder">
      <OrbiterDay v-for="day, index of weekData" :key="day.contact_date" :data="day" class="week-holder__day"
        :style="getOrbitStyle(index)" ref="itemRefs" />
    </div>
    <MainSearch />
  </div>
</template>
<style scoped lang="scss">
.week-holder {
  @apply relative h-full;

  &__day {
    @apply absolute bottom-0;
  }
}

.main {
  @apply relative h-full;
}
</style>