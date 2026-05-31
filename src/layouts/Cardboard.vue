<template>
    <div class="az-layout">
        <slot />
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.az-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>