<template>
	<div class="az-key" :class="'az-key--'+keyType">
        <slot />
    </div>
</template>

<script lang="ts" setup>
defineProps<{
	keyType: string
}>()
</script>

<style lang="scss" scoped>
.az-key {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-grey-300;
    box-shadow: 0 0.2em 0 0.05em $color-grey-400;
    border-radius: 4px;
    border: 1px solid $color-milk-500;
    border-bottom-color: $color-milk-400;
    line-height: 1em;
    color: $color-grey-100;

    &--arrow {
        width: 40px;
        height: 28px;
        font-size: 8px;
    }

    &--letter {
        width: 40px;
        height: 40px;
        font-size: 15px;
    }
}
</style>