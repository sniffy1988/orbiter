<template>
    <div :class="['avatar', `avatar--${type}`]">
        <img :src="src" :alt="alt" class="avatar__image">
    </div>
</template>

<script setup>
defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'small'
    }
})
</script>

<style scoped lang="scss">
.avatar {
    @apply rounded-full overflow-hidden;

    &--large {
        width: 100px;
        height: 100px;
    }

    &--small {
        @apply w-avatarSmall h-avatarSmall;
    }

    &__image {
        @apply w-full h-full block object-cover;
    }
}
</style>