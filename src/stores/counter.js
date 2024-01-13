import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiBaseUrl = 'https://xwmi-5dlx-wkyj.t7.xano.io/api:oUvfVMO5/receive_week?start_date='

export const useOrbiterStore = defineStore('orbiter', () => {
  const startDate = ref('');
  const week = ref([]);
  async function receiveWeek() {
    try {
    const {data, status} = await axios.get(apiBaseUrl+startDate.value);
      if(status === 200) {
        week.value = data;
      } else{
        console.error(data.message)
      }
      
    } catch (error) {
      console.error(error)
    }
  }
  function setStartDate(date) {
    startDate.value = date
  }

  const weekData = computed(() => {
    return week.value
  })

  return { weekData, setStartDate, receiveWeek }
})
