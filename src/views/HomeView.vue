<script setup>
import { useOrbiterStore } from '@/stores/counter';
import OrbiterDay from '@/components/OrbiterDay/OrbiterDay.vue'
import MainSearch from '@/components/MainSearch/MainSearch.vue'
import { computed, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core'
import { addDays, format } from "date-fns";

const store = useOrbiterStore();
const itemRefs = ref([])
const startDate = computed(() => {
  return store.startDate
});
const weekData = computed(() => {
  return store.weekData;
});



watch(startDate, () => {
  store.receiveWeek();
});

const getOrbitStyle = (index) => {
  const offset = 80;
  return {
    left: index * offset + 'px',
    right: index * offset + 'px',
  }
};

const onScroll = ({ deltaY }) => {
  if (startDate.value !== '') {
    let day = 0;
    if (deltaY < 0) {
      day -= 1;
    } else {
      day += 1;
    }
    const newDate = addDays(startDate.value, day);
    store.setStartDate(format(newDate, 'dd-MM-yyyy'))
    alert(`Setted to ${format(newDate, 'dd-MM-yyyy')}`);
  }
}

const debouncedFn = useDebounceFn(onScroll, 1000, { maxWait: 5000 })



</script>

<template>
  <div class="main" @wheel="debouncedFn">
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