<template>
    <div class="main__search">
        <div class="main__search--closed" v-if="!isOpen" @click="toggleOpen"><img src="@/assets/company.svg"
                alt="avatar group"></div>
        <div class="main__search--open" v-else>
            <div class="block" @click="toggleOpen">
                <svg-icon :path="mdiChevronLeft" type="mdi" class="main__search--open__button" />
                Back
            </div>
            <div class="input">
                <input type="text" placeholder="Search or command" v-model="search" class="main__search--open__input" />
                <svg-icon :path="mdiChevronRight" type="mdi" class="main__search--open__button" @click="makeSearch" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import { useOrbiterStore } from '@/stores/counter';

const store = useOrbiterStore();

const search = ref('');
const isOpen = ref(false);

const toggleOpen = () => {
    isOpen.value = !isOpen.value;
    search.value = '';
}

const makeSearch = () => {
    if (validate(search.value)) {
        isOpen.value = false;
        store.setStartDate(search.value);
        search.value = '';
    } else {
        alert('set date in DD-MM-YYY format');
    }

}
const validate = (model) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

    return dateRegex.test(model);
}
</script>

<style lang="scss" scoped>
.main__search {
    height: 75px;
    @apply fixed bottom-2 left-0 right-0 mx-auto flex justify-center;

    &--closed {
        @apply cursor-pointer;
    }

    &--open {
        @apply flex h-full border rounded-lg;

        &__input {
            @apply bg-transparent h-full;
        }
    }
}

.block {
    @apply cursor-pointer flex mr-4 items-center;
}

.input {
    @apply cursor-pointer flex items-center;
}
</style>