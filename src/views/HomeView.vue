<script setup>
import { useOrbiterStore } from '@/stores/counter';
import OrbiterDay from '@/components/OrbiterDay/OrbiterDay.vue'
import { computed, onMounted, ref } from 'vue';

const store = useOrbiterStore();
const itemRefs = ref([])
store.setStartDate('10-01-2023');

const weekData = computed(() => {
  console.log(store.weekData)
  return store.weekData;
})
onMounted(() => {
  store.receiveWeek()
});

const getOrbitStyle = (index) => {
  const offset = 100;
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
    <div class="main__search">
      <div>Closed icon</div>
      <div>
        <div>back</div>
        <div>search or command</div>
      </div>
    </div>
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
  @apply relative;
  height: 100%;

  &__search {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>