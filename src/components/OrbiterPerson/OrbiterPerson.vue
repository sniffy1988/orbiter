<template>
    <div class="person" @mouseenter="openPerson" @mouseleave="closePerson">
        <div v-if="!isOpen" class="person__avatar">
            <AvatarSmall :src="person.img" :alt="person.name" />
        </div>
        <div v-else class="activitycard">
            <div class="activitycard__head">
                <AvatarSmall :src="person.img" :alt="person.name" type="large" class="activitycard__avatar" />
                <div class="activitycard__text">
                    <h3 class="activitycard__text__name">{{ person.name }}</h3>
                    <h4 class="activitycard__text__position">{{ person.position }}</h4>
                    <p class="activitycard__text__location">{{ person.city }}</p>
                    <div class="activitycard__text__mutual">
                        <div class="activitycard__text__avatargroup"><img src="@/assets/avatargroup.png" alt="avatar group">
                        </div>
                        <div>Jason Diamond, John Eremic, <br />
                            and 281 other mutual connections</div>
                    </div>
                </div>
            </div>
            <div class="activitycard__company"><img src="@/assets/company.svg" alt="avatar group"></div>
            <div class="activitycard__message">
                <div class="activitycard__message__head"><svg-icon type="mdi" :path="mdiEmailOutline"
                        class="activitycard__message__head__icon"></svg-icon>Reply from Emery Wells</div>
                <div class="activitycard__message__date">
                    <p>{{ person.created_at }}Saturday, November 4 2023 at 9:04 AM EST</p>
                    <p>2 days ago</p>
                </div>
                <div class="activitycard__message__text">
                    <h4 class="activitycard__message__text__title">{{ person._orbits_last_message.message_head }}</h4>
                    <p class="activitycard__message__text__message"
                        :class="{ 'activitycard__message__text__message--truncate': truncate }">{{
                            person._orbits_last_message.message }}</p>
                </div>
                <div class="activitycard__message__text__action" @click="toggleTruncate">{{ truncate ? 'More' : 'Less' }}
                    <svg-icon type="mdi" :path="!truncate ? mdiChevronUp : mdiChevronDown"
                        class="activitycard__message__text__action__icon"></svg-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AvatarSmall from '@/components/AvatarSmall/AvatarSmall.vue'
import { mdiEmailOutline, mdiChevronUp, mdiChevronDown } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';


defineProps({
    person: {
        type: Object,
        required: true
    }
})
const isOpen = ref(false);
const truncate = ref(true);
const toggleTruncate = () => {
    truncate.value = !truncate.value;
}
const openPerson = () => {
    isOpen.value = true;
}
const closePerson = () => {
    isOpen.value = false;
    truncate.value = true;
}
</script>

<style lang="scss" scoped>
.person {
    height: 60px;
    margin-top: -30px;
    position: relative;

    &__avatar {
        @apply cursor-pointer;
    }
}

.activitycard {
    @apply relative text-white border rounded-lg;
    width: 502px;
    background: #0A0A0A;
    z-index: 200;

    &__head {
        @apply flex mb-2.5 p-2.5 mr-20;
    }

    &__company {
        @apply absolute right-2.5 top-2.5;
    }

    &__avatar {
        @apply mr-4 flex-shrink-0;
    }

    &__text {
        @apply w-full;

        &__name {
            @apply font-bold mb-1;
        }

        &__position {
            @apply text-xs mb-1;
        }

        &__location {
            @apply mb-1 text-xs;
        }

        &__mutual {
            @apply flex text-xs;
        }

        &__avatargroup {
            @apply mr-1;
        }
    }

    &__message {
        @apply bg-black bg-opacity-65;

        &__head {
            @apply p-2.5 font-light flex bg-black bg-opacity-80;

            &__icon {
                @apply mr-2.5;

            }
        }

        &__date {
            @apply flex;
            @apply text-sm p-2.5 justify-between;
            color: #929292;
        }

        &__text {
            @apply p-2.5 bg-black bg-opacity-65;

            &__title {
                @apply font-bold mb-1;
            }

            &__message {
                @apply font-light;

                &--truncate {
                    @apply truncate;
                }
            }

            &__action {
                @apply m-2.5 cursor-pointer flex text-sm items-center;

                &__icon {
                    @apply ml-2.5;
                }
            }
        }
    }
}
</style>