<script setup>
import { useOrbiterStore } from '@/stores/counter';
import OrbiterDay from '@/components/OrbiterDay/OrbiterDay.vue'
import { computed, onMounted } from 'vue';

const store = useOrbiterStore();
store.setStartDate('10-01-2023');

const weekData = computed(() => {
  return store.weekData;
})
onMounted(() => {
  store.receiveWeek()
})
</script>

<template>
<div>
  <div class="week">
    <OrbiterDay v-for="day of weekData" :key="day.contact_date" :data="day">
    </OrbiterDay>
    <div>
      <div>message icon</div>
      <div>Full message</div>
    </div>
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
